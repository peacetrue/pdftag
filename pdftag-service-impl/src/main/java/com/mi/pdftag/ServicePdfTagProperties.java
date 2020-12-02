package com.mi.pdftag;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

/**
 * @author xiayx
 */
@Data
@ConfigurationProperties(prefix = "com.mi.pdf-tag")
public class ServicePdfTagProperties {

    /** dita 目录，根据样式类型转换 */
    private Map<String, String> ditaBaseDir = new HashMap<>(3);

    {
        ditaBaseDir.put(DitaStyle.DEFAULT.getId(), "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3");
        ditaBaseDir.put(DitaStyle.CHINESE.getId(), "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3-chinese");
        ditaBaseDir.put(DitaStyle.ENGLISH.getId(), "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3-english");
    }

    /**
     * 基于 {@link com.github.peacetrue.file.ServiceFileProperties#basePath}，
     * 可以使用 {@link com.github.peacetrue.file.FileController#download(ServerHttpResponse, String)}
     */
    private String outputDir = "output";
    private String templateFileName = "template.dita";
    private String reproductionCustomizationDir = "/Users/xiayx/Documents/Projects/learn-dita-ot/src/test/resources/watermark";
}
