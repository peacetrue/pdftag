package com.mi.pdftag;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.Objects;

/**
 * @author xiayx
 */
@Configuration
@EnableConfigurationProperties(ServicePdfTagProperties.class)
@ComponentScan(basePackageClasses = ServicePdfTagAutoConfiguration.class)
@PropertySource("classpath:/application-pdf-tag-service.yml")
public class ServicePdfTagAutoConfiguration {

    private ServicePdfTagProperties properties;

    public ServicePdfTagAutoConfiguration(ServicePdfTagProperties properties) {
        this.properties = Objects.requireNonNull(properties);
    }

}
