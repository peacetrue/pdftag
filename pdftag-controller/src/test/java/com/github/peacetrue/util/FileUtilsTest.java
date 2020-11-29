package com.github.peacetrue.util;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

/**
 * @author : xiayx
 * @since : 2020-11-27 23:13
 **/
class FileUtilsTest {

    @Test
    void replaceExtension() {
        Assert.assertEquals(PdfTagFileUtils.replaceExtension("a/b/c.txt", "pdf"), "a/b/c.pdf");
        Assert.assertEquals(PdfTagFileUtils.replaceExtension("c.txt", "pdf"), "c.pdf");
        Assert.assertEquals(PdfTagFileUtils.replaceExtension("c.c.txt", "pdf"), "c.c.pdf");
    }
}
