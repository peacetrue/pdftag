package com.github.peacetrue.dita;

import com.github.peacetrue.util.PdfTagFileUtils;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author : xiayx
 * @since : 2020-11-24 21:58
 **/
@Slf4j
public abstract class DitaUtils {

    protected DitaUtils() {
    }

    public static String resolvePdfFilePath(String basePath, String fileName) {
        return basePath.concat("/").concat(PdfTagFileUtils.replaceExtension(fileName, "pdf"));
    }

    public static Mono<String> executePdf(String baseFolder,
                                          String inputFile,
                                          String outputFolder,
                                          String... other) {
        log.info("exec dita command for pdf in {}", baseFolder);
        String format = "pdf";
        List<String> commands = new ArrayList<>(7 + other.length);
        commands.add(baseFolder + "/bin/dita");
        commands.addAll(Arrays.asList("-input", inputFile));
        commands.addAll(Arrays.asList("-format", format));
        commands.addAll(Arrays.asList("-output", outputFolder));
        commands.addAll(Arrays.asList(other));
        return execute(commands)
                .flatMap(exitValue -> exitValue == 0
                        ? Mono.just(resolvePdfFilePath(outputFolder, Paths.get(inputFile).getFileName().toString()))
                        : Mono.error(new IllegalStateException("exec dita command abnormal return " + exitValue))
                );
    }

    public static Mono<Integer> execute(List<String> commands) {
        if (log.isInfoEnabled()) log.info("execute commands: {}", String.join(" ", commands));
        ProcessBuilder builder = new ProcessBuilder(commands);
        builder.inheritIO();
        return Mono.fromCallable(() -> builder.start().waitFor())
                .flatMap(exitValue -> exitValue == 0
                        ? Mono.just(exitValue)
                        : Mono.error(new IllegalStateException("exec dita command abnormal return " + exitValue))
                );
    }

}
