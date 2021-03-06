package com.mi.pdftag;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration;
import org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;

/**
 * @author xiayx
 */
@Configuration
@ImportAutoConfiguration(classes = {
        TestServicePdfTagAutoConfiguration.class,
        WebMvcAutoConfiguration.class,
        HttpMessageConvertersAutoConfiguration.class,
        ControllerPdfTagAutoConfiguration.class,
        SpringDataWebAutoConfiguration.class,
})
@EnableAutoConfiguration
@ActiveProfiles("pdf-tag-controller-test")
public class TestControllerPdfTagAutoConfiguration {

}
