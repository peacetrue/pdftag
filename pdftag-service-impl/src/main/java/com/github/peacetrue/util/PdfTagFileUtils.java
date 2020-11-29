package com.github.peacetrue.util;

import reactor.core.publisher.Mono;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicLong;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * @author : xiayx
 * @since : 2020-11-27 23:10
 **/
public abstract class PdfTagFileUtils {

    public static final AtomicLong ATOMIC_LONG = new AtomicLong(0);

    protected PdfTagFileUtils() {
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

    public static void unzip(String fileZip) throws IOException {
        unzip(fileZip, Paths.get(fileZip).getParent().toFile());
    }

    public static void unzip(String fileZip, File destDir) throws IOException {
        byte[] buffer = new byte[1024];
        ZipInputStream zis = new ZipInputStream(new FileInputStream(fileZip));
        ZipEntry zipEntry = zis.getNextEntry();
        while (zipEntry != null) {
            File newFile = newFile(destDir, zipEntry);
            if (zipEntry.isDirectory()) {
                if (!newFile.isDirectory() && !newFile.mkdirs()) {
                    throw new IOException("Failed to create directory " + newFile);
                }
            } else {
                // fix for Windows-created archives
                File parent = newFile.getParentFile();
                if (!parent.isDirectory() && !parent.mkdirs()) {
                    throw new IOException("Failed to create directory " + parent);
                }

                // write file content
                FileOutputStream fos = new FileOutputStream(newFile);
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }
                fos.close();
            }
            zipEntry = zis.getNextEntry();
        }
        zis.closeEntry();
        zis.close();
    }

    public static File newFile(File destinationDir, ZipEntry zipEntry) throws IOException {
        File destFile = new File(destinationDir, zipEntry.getName());

        String destDirPath = destinationDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
        }

        return destFile;
    }
}
