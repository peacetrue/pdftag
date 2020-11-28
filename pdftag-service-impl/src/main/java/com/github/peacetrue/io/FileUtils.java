package com.github.peacetrue.io;

import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicLong;

/**
 * @author : xiayx
 * @since : 2020-11-27 23:10
 **/
public abstract class FileUtils {

    public static final AtomicLong ATOMIC_LONG = new AtomicLong(0);

    protected FileUtils() {
    }

    /**
     * replaceExtension("a/b/c.txt","pdf")="a/b/c.pdf"
     */
    public static String replaceExtension(String filePath, String extension) {
        return filePath.replaceFirst("(.*\\.).*$", "$1" + extension);
    }

    public static Mono<String> saveToTempFile(String content, String extension) {
        String filePath = System.getProperty("java.io.tmpdir")
                + System.currentTimeMillis() / 1000 + ATOMIC_LONG.getAndIncrement() + "." + extension;
        return Mono.fromCallable(() -> {
            Path path = Files.createFile(Paths.get(filePath));
            Files.write(path, content.getBytes(StandardCharsets.UTF_8));
            return filePath;
        });
    }
}
