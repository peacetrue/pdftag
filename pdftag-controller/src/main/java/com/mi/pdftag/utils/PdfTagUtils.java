package com.mi.pdftag.utils;

import com.mi.pdftag.modules.phonetag.PhoneTagVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.expression.Expression;
import org.springframework.expression.ParserContext;
import org.springframework.expression.common.TemplateParserContext;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import reactor.core.publisher.Mono;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

/**
 * @author : xiayx
 * @since : 2020-11-24 21:58
 **/
@Slf4j
public abstract class PdfTagUtils {

    protected PdfTagUtils() {
    }

    private static final SpelExpressionParser PARSER = new SpelExpressionParser();
    private static final ParserContext PARSER_CONTEXT = new TemplateParserContext();

    public static String parse(String expressionString, PhoneTagVO vo) {
        Expression expression = PARSER.parseExpression(expressionString, PARSER_CONTEXT);
        return expression.getValue(vo, String.class);
    }

    public static final AtomicLong ATOMIC_LONG = new AtomicLong(0);

    public static Mono<String> saveToTempFile(String content, String extension) {
        String filePath = System.getProperty("java.io.tmpdir")
                + System.currentTimeMillis() / 1000 + ATOMIC_LONG.getAndIncrement() + "." + extension;
        return Mono.fromCallable(() -> {
            Path path = Files.createFile(Paths.get(filePath));
            Files.write(path, content.getBytes(StandardCharsets.UTF_8));
            return filePath;
        });
    }

    public static Mono<String> executeDita(String basedir, String inputFile, String format, String outputFolder, String... other) {
        log.info("exec dita command in {}", basedir);
        List<String> commands = new ArrayList<>(7 + other.length);
        commands.add(basedir + "/bin/dita");
        commands.addAll(Arrays.asList("-input", inputFile));
        commands.addAll(Arrays.asList("-format", format));
        commands.addAll(Arrays.asList("-output", outputFolder));
        commands.addAll(Arrays.asList(other));
        log.debug("exec dita command: {} ", String.join(" ", commands));
        ProcessBuilder builder = new ProcessBuilder(commands);
        builder.inheritIO();
        return Mono.fromCallable(() -> builder.start().waitFor())
                .flatMap(exitValue -> exitValue == 0
                        ? Mono.just(outputFolder.concat("/" + Paths.get(inputFile).getFileName().toString().replaceFirst("(.*\\.).*", "$1" + format)))
                        : Mono.error(new IllegalStateException("exec dita command abnormal return " + exitValue))
                );
    }

    public static void main(String[] args) {
        System.out.println(File.separator);
    }
}
