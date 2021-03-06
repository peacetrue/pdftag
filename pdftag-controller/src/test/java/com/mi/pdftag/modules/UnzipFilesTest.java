package com.mi.pdftag.modules;

import com.github.peacetrue.util.PdfTagFileUtils;
import org.junit.jupiter.api.Test;

import java.io.File;

/**
 * @author : xiayx
 * @since : 2020-11-27 10:17
 **/
class UnzipFilesTest {

    @Test
    void unzip() throws Exception {
        String zipFilePath = "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/Mi_giftBox_label_Cn.zip";
        String destDir = "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment";
        PdfTagFileUtils.unzip(zipFilePath, new File(destDir));
    }
}
