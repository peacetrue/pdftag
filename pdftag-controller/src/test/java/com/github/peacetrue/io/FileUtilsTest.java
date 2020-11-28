package com.github.peacetrue.io;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

/**
 * @author : xiayx
 * @since : 2020-11-27 23:13
 **/
class FileUtilsTest {

    @Test
    void replaceExtension() {
        Assert.assertEquals(FileUtils.replaceExtension("a/b/c.txt", "pdf"), "a/b/c.pdf");
        Assert.assertEquals(FileUtils.replaceExtension("c.txt", "pdf"), "c.pdf");
        Assert.assertEquals(FileUtils.replaceExtension("c.c.txt", "pdf"), "c.c.pdf");
    }
}
