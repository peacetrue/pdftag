package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.attachment.AttachmentGet;
import com.github.peacetrue.attachment.AttachmentService;
import com.github.peacetrue.dita.DitaUtils;
import com.github.peacetrue.file.FileController;
import com.github.peacetrue.file.FileService;
import com.github.peacetrue.imports.ImportsResult;
import com.github.peacetrue.imports.ImportsService;
import com.github.peacetrue.imports.csv.CsvImportsSetting;
import com.github.peacetrue.spring.util.BeanUtils;
import com.mi.pdftag.ControllerPdfTagProperties;
import com.mi.pdftag.VersionType;
import com.mi.pdftag.modules.DitaStyle;
import com.mi.pdftag.modules.template.TemplateGet;
import com.mi.pdftag.modules.template.TemplateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.io.SequenceInputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 标签控制器
 *
 * @author xiayx
 */
@Slf4j
@RestController
@RequestMapping(value = "/phone-tags")
public class PhoneTagController {

    @Autowired
    private PhoneTagService phoneTagService;
    @Autowired
    private TemplateService templateService;
    @Autowired
    private AttachmentService attachmentService;
    @Autowired
    private FileService fileService;
    @Autowired
    private ControllerPdfTagProperties properties;
    public static final AtomicLong ATOMIC_LONG = new AtomicLong(0);

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<PhoneTagVO> addByForm(PhoneTagAdd params) {
        log.info("新增标签信息(请求方法+表单参数)[{}]", params);
        return phoneTagService.add(params);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<PhoneTagVO> addByJson(@RequestBody PhoneTagAdd params) {
        log.info("新增标签信息(请求方法+JSON参数)[{}]", params);
        return phoneTagService.add(params);
    }

    @GetMapping(params = "page")
    public Mono<Page<PhoneTagVO>> query(PhoneTagQuery params, Pageable pageable, String... projection) {
        log.info("分页查询标签信息(请求方法+参数变量)[{}]", params);
        return phoneTagService.query(params, pageable, projection);
    }

    @GetMapping
    public Flux<PhoneTagVO> query(PhoneTagQuery params, Sort sort, String... projection) {
        log.info("全量查询标签信息(请求方法+参数变量)[{}]", params);
        return phoneTagService.query(params, sort, projection);
    }

    @GetMapping("/{id}")
    public Mono<PhoneTagVO> getByUrlPathVariable(@PathVariable Long id, String... projection) {
        log.info("获取标签信息(请求方法+路径变量)详情[{}]", id);
        return phoneTagService.get(new PhoneTagGet(id), projection);
    }

    @RequestMapping("/get")
    public Mono<PhoneTagVO> getByPath(PhoneTagGet params, String... projection) {
        log.info("获取标签信息(请求路径+参数变量)详情[{}]", params);
        return phoneTagService.get(params, projection);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<Integer> modifyByForm(PhoneTagModify params) {
        log.info("修改标签信息(请求方法+表单参数)[{}]", params);
        return phoneTagService.modify(params);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Integer> modifyByJson(@RequestBody PhoneTagModify params) {
        log.info("修改标签信息(请求方法+JSON参数)[{}]", params);
        return phoneTagService.modify(params);
    }

    @DeleteMapping("/{id}")
    public Mono<Integer> deleteByUrlPathVariable(@PathVariable Long id) {
        log.info("删除标签信息(请求方法+URL路径变量)[{}]", id);
        return phoneTagService.delete(new PhoneTagDelete(id));
    }

    @DeleteMapping(params = "id")
    public Mono<Integer> deleteByUrlParamVariable(PhoneTagDelete params) {
        log.info("删除标签信息(请求方法+URL参数变量)[{}]", params);
        return phoneTagService.delete(params);
    }

    @RequestMapping(path = "/delete")
    public Mono<Integer> deleteByPath(PhoneTagDelete params) {
        log.info("删除标签信息(请求路径+URL参数变量)[{}]", params);
        return phoneTagService.delete(params);
    }

    @Autowired
    private ImportsService importsService;

    @PostMapping(params = "type=imports")
    public Mono<ImportsResult> imports(@RequestPart("file") FilePart file) {
        log.info("导入CSV文件[{}]", file.filename());
        CsvImportsSetting importsSetting = new CsvImportsSetting();
        importsSetting.setHeader(new String[]{"样式", "模版", "商品名称", "认证型号", "包装内含", "执行标准", "CMIIT ID", "进网许可证", "产品名称", "颜色", "存储空间"});
        importsSetting.setCharset(StandardCharsets.UTF_8);
        importsSetting.setMaxRowCount(100);
        return file.content()
                .map(DataBuffer::asInputStream)
                .reduce(SequenceInputStream::new)
                .flatMap(inputStream -> Mono.fromCallable(() -> importsService.imports(inputStream, importsSetting)))
                ;
    }


    @GetMapping("/export")
    public Mono<Void> export(ServerHttpResponse response, String versionType, PhoneTagVO vo) {
        log.info("导出[{}]", vo);
        boolean isReproduction = VersionType.REPRODUCTION.getCode().equals(versionType);
        return templateService.get(new TemplateGet(vo.getTemplateId()))
                .flatMap(templateVO -> attachmentService.get(new AttachmentGet(templateVO.getAttachmentId())))
                .flatMap(attachmentVO -> {
                    String absoluteFilePath = fileService.getAbsoluteFilePath(attachmentVO.getPath());
                    String folderPath = absoluteFilePath.substring(0, absoluteFilePath.length() - ".zip".length());
                    String templateFile = folderPath + File.separatorChar + properties.getTemplateFileName();
                    return Mono.fromCallable(() -> new String(Files.readAllBytes(Paths.get(templateFile)), StandardCharsets.UTF_8))
                            .map(content -> DitaUtils.parse(content, BeanUtils.map(vo)))
                            .flatMap(content -> Mono.fromCallable(() -> {
                                //TODO handle long overflow
                                String tempFileName = "template-" + ATOMIC_LONG.getAndIncrement() + ".dita";
                                Path tempFilePath = Paths.get(folderPath, tempFileName);
                                Path path = Files.createFile(tempFilePath);
                                Files.write(path, content.getBytes(StandardCharsets.UTF_8));
                                return tempFilePath;
                            }));
                })
                .flatMap(ditaFilePath -> {
                    String basedir = properties.getDitaBaseDir().get(vo.getStyleCode());
                    String ditaFileName = ditaFilePath.getParent().getFileName().toString()
                            + File.separatorChar + ditaFilePath.getFileName().toString();
                    List<String> params = new ArrayList<>(2);
                    params.add("-Dargs.input.dir=" + ditaFilePath.getParent().toString());
                    if (isReproduction)
                        params.add("-Dcustomization.dir=" + properties.getReproductionCustomizationDir());
                    return DitaUtils.executeDita(basedir, ditaFileName, "pdf", properties.getOutputDir(), params.toArray(new String[0]))
                            .doOnNext((pdfPath) -> {
                                try {
                                    Files.delete(ditaFilePath);
                                } catch (IOException e) {
                                    log.error("删除临时 dita 文件[{}]异常", ditaFilePath, e);
                                }
                            })
                            .flatMap(pdfPath -> isReproduction
                                    ? FileController.previewLocalFile(response, pdfPath)
                                    : FileController.downloadLocalFile(response, pdfPath)
                            )
                            ;
                });
    }

    @GetMapping(value = "/{id}/export")
    public Mono<Void> export(ServerHttpResponse response, @PathVariable Long id, String versionType) {
        return phoneTagService.get(new PhoneTagGet(id))
                .flatMap(vo -> this.export(response, Objects.toString(versionType, VersionType.REPRODUCTION.getCode()), vo));
    }

}
