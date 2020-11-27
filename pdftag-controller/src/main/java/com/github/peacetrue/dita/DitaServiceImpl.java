package com.github.peacetrue.dita;

import com.mi.pdftag.ControllerPdfTagProperties;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

/**
 * @author : xiayx
 * @since : 2020-11-27 02:16
 **/
@Slf4j
@Data
@Service
public class DitaServiceImpl implements DitaService {

    public static final AtomicLong ATOMIC_LONG = new AtomicLong(0);

    private String outputDir;
    private String templateFileName = "template.dita";

    @Autowired
    public void setPdfTag(ControllerPdfTagProperties properties) {
        this.outputDir = properties.getOutputDir();
    }

    @Override
    public Mono<String> execute(String ditaBaseDir, String templateFolder, Map<String, Object> params) {
        log.info("生成文件");
        Path templateFilePath = Paths.get(templateFolder, templateFileName);
        return Mono.fromCallable(() -> new String(Files.readAllBytes(templateFilePath), StandardCharsets.UTF_8))
                .map(content -> DitaUtils.parse(content, params))
                .flatMap(content -> Mono.fromCallable(() -> {
                    String tempFileName = "temp-" + ATOMIC_LONG.getAndIncrement() + ".dita";
                    Path tempPath = templateFilePath.resolveSibling(tempFileName);
                    Path path = Files.createFile(tempPath);
                    Files.write(path, content.getBytes(StandardCharsets.UTF_8));
                    return tempPath;
                }))
                .flatMap(tempPath -> DitaUtils.executeDita(ditaBaseDir, tempPath.getFileName().toString(),
                        "pdf", outputDir, "-Dargs.input.dir=" + templateFolder)
                        .doOnNext(outputFile -> Mono.fromCallable(() -> Files.deleteIfExists(tempPath))))
                ;
    }
}
