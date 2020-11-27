package com.mi.pdftag;

import com.mi.pdftag.modules.DitaStyle;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

/**
 * 控制器配置
 *
 * @author xiayx
 */
@Getter
@Setter
@ConfigurationProperties(prefix = "com.mi.pdf-tag")
public class ControllerPdfTagProperties {

    private Map<DitaStyle, String> ditaBaseDir = new HashMap<>(3);

    {
        ditaBaseDir.put(DitaStyle.DEFAULT, "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3");
        ditaBaseDir.put(DitaStyle.CHINESE, "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3-chinese");
        ditaBaseDir.put(DitaStyle.ENGLISH, "/Users/xiayx/Documents/Projects/pdftag/docs/antora/modules/ROOT/attachment/dita-ot-2.3-english");
    }

    private String outputDir = "/Users/xiayx/Documents/Projects/pdftag/02-output";
    private String templateFileName = "template.dita";
    private String reproductionCustomizationDir = "/Users/xiayx/Documents/Projects/learn-dita-ot/src/test/resources/watermark";
}
