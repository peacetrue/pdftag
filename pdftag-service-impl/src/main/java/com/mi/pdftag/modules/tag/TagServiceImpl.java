package com.mi.pdftag.modules.tag;

import com.github.peacetrue.attachment.AttachmentGet;
import com.github.peacetrue.attachment.AttachmentService;
import com.github.peacetrue.dita.DitaUtils;
import com.github.peacetrue.file.FileService;
import com.github.peacetrue.spring.SpringExpressionUtils;
import com.github.peacetrue.spring.util.BeanUtils;
import com.github.peacetrue.util.UUIDUtils;
import com.mi.pdftag.ServicePdfTagProperties;
import com.mi.pdftag.VersionType;
import com.mi.pdftag.modules.template.TemplateGet;
import com.mi.pdftag.modules.template.TemplateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author : xiayx
 * @since : 2020-11-28 04:20
 **/
@Slf4j
@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private ServicePdfTagProperties properties;
    @Autowired
    private FileService fileService;
    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    private TemplateService templateService;

    @Override
    public Mono<String> generatePdf(TagGeneratePdf params) {
        log.info("生成PDF文件: {}", params);
        boolean isReproduction = VersionType.REPRODUCTION.getCode().equals(params.getVersionType());
        return templateService.get(new TemplateGet(params.getTag().getTemplateId()))
                .flatMap(templateVO -> attachmentService.get(new AttachmentGet(templateVO.getAttachmentId())))
                .flatMap(attachmentVO -> {
                    String absoluteFilePath = fileService.getAbsoluteFilePath(attachmentVO.getPath());
                    String folderPath = absoluteFilePath.substring(0, absoluteFilePath.length() - ".zip".length());
                    String templateFile = folderPath + File.separatorChar + properties.getTemplateFileName();
                    return Mono.fromCallable(() -> new String(Files.readAllBytes(Paths.get(templateFile)), StandardCharsets.UTF_8))
                            .map(content -> SpringExpressionUtils.parse(content, BeanUtils.map(params.getTag())))
                            .flatMap(content -> Mono.fromCallable(() -> {
                                //TODO handle long overflow
                                String tempFileName = "template-" + UUIDUtils.randomUUID() + ".dita";
                                Path tempFilePath = Paths.get(folderPath, tempFileName);
                                Path path = Files.createFile(tempFilePath);
                                Files.write(path, content.getBytes(StandardCharsets.UTF_8));
                                return tempFilePath;
                            }));
                })
                .flatMap(ditaFilePath -> {
                    String baseFolder = properties.getDitaBaseDir().get(params.getTag().getStyleCode());
                    String ditaFileName = ditaFilePath.getFileName().toString();
                    String ditaFile = ditaFilePath.getParent().getFileName().toString() + File.separatorChar + ditaFileName;
                    List<String> arguments = new ArrayList<>(2);
                    arguments.add("-Dargs.input.dir=" + ditaFilePath.getParent().toString());
                    if (isReproduction)
                        arguments.add("-Dcustomization.dir=" + properties.getReproductionCustomizationDir());
                    //TODO 优化 PDF 存储路径
                    String absoluteFilePath = fileService.getAbsoluteFilePath(properties.getOutputDir());
                    return DitaUtils.executePdf(baseFolder, ditaFile, absoluteFilePath, arguments.toArray(new String[0]))
                            .doOnNext((pdfPath) -> {
                                try {
                                    Files.delete(ditaFilePath);
                                } catch (IOException e) {
                                    log.error("删除临时 dita 文件[{}]异常", ditaFilePath, e);
                                }
                            }).map(pdfPath -> DitaUtils.resolvePdfFilePath(properties.getOutputDir(), ditaFileName));
                });
    }


    @Override
    public Mono<Map<String, String>> generatePdfAllVersion(TagGeneratePdf params) {
        //phoneTagService.modify(PhoneTagModify.forPdf(((IdCapable<Long>) params.getTag()).getId(), tuple2.getT1(), tuple2.getT2()))
        return Mono.zip(
                this.generatePdf(new TagGeneratePdf(VersionType.REPRODUCTION.getCode(), params.getTag())),
                this.generatePdf(new TagGeneratePdf(VersionType.PRODUCTION.getCode(), params.getTag()))
        ).map(tuple2 -> {
            HashMap<String, String> versions = new HashMap<>(2);
            versions.put(VersionType.REPRODUCTION.getCode(), tuple2.getT1());
            versions.put(VersionType.PRODUCTION.getCode(), tuple2.getT2());
            return versions;
        });
    }
}
