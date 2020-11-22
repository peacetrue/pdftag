package com.mi.pdftag;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.r2dbc.core.DatabaseClient;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;

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

    @Bean
    public R2dbcEntityTemplate r2dbcEntityTemplate(DatabaseClient databaseClient) {
        return new R2dbcEntityTemplate(databaseClient);
    }
}
