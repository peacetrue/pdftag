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

    /** dita 目录位置 */
    private String ditaBaseDir;
    /** dita 目录位置，根据样式类型转换 */
    private Map<String, String> ditaBaseDirs = new HashMap<>(DitaStyle.values().length);

    public void setDitaBaseDir(String ditaBaseDir) {
        this.ditaBaseDir = ditaBaseDir;
        for (DitaStyle value : DitaStyle.values()) {
            ditaBaseDirs.put(value.name(), ditaBaseDir + "-" + value.name().toLowerCase());
        }
    }

    {
        setDitaBaseDir("/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3");
    }


    private String templateFileName = "template.dita";

    /** dita 自定义目录位置 */
    private String reproductionCustomizationDir;
    private Map<String, String> reproductionCustomizationDirs = new HashMap<>(DitaStyle.values().length);

    public void setReproductionCustomizationDir(String reproductionCustomizationDir) {
        this.reproductionCustomizationDir = reproductionCustomizationDir;
        for (DitaStyle value : DitaStyle.values()) {
            reproductionCustomizationDirs.put(value.name(), reproductionCustomizationDir + "/" + value.name().toLowerCase());
        }
    }

    {
        setReproductionCustomizationDir("/Users/xiayx/Documents/Projects/pdftag/01-upload/watermark");
    }


    private String axfPath = "/usr/local/AHFormatterV70";
    /**
     * 基于 {@link com.github.peacetrue.file.ServiceFileProperties#basePath}，
     * 可以使用 {@link com.github.peacetrue.file.FileController#download(ServerHttpResponse, String)}
     */
    private String outputDir = "output";

}
