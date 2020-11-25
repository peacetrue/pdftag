package com.mi.pdftag;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author xiayx
 */
@Data
@ConfigurationProperties(prefix = "com.xiaomi.pdf-tag")
public class ServicePdfTagProperties {

}
