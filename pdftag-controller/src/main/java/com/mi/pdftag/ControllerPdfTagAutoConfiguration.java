package com.mi.pdftag;

import com.github.peacetrue.imports.*;
import com.github.peacetrue.imports.csv.CsvImportsInputStreamProcessor;
import com.github.peacetrue.imports.csv.CsvImportsService;
import com.github.peacetrue.spring.formatter.date.AutomaticDateFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticLocalDateFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticLocalDateTimeFormatter;
import com.mi.pdftag.modules.phonetag.imports.TaskChecker;
import com.mi.pdftag.modules.phonetag.imports.TaskRowProcessor;
import com.mi.pdftag.modules.phonetag.imports.TaskSaver;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.web.ReactivePageableHandlerMethodArgumentResolver;
import org.springframework.data.web.ReactiveSortHandlerMethodArgumentResolver;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;


/**
 * @author xiayx
 */
@Configuration
@EnableConfigurationProperties(ControllerPdfTagProperties.class)
@ComponentScan(basePackageClasses = ControllerPdfTagAutoConfiguration.class)
@PropertySource("classpath:/application-pdf-tag-controller.yml")
public class ControllerPdfTagAutoConfiguration {

    @ControllerAdvice
    public static class StringTrimmerControllerAdvice {
        @InitBinder
        public void registerCustomEditors(WebDataBinder binder) {
            binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
        }
    }

    @Bean
    public ImportsService importsService(ImportsInputStreamProcessor inputStreamProcessor,
                                         ImportsChecker importsChecker,
                                         ImportsSaver importsSaver) {
        return new CsvImportsService(inputStreamProcessor, importsChecker, importsSaver);
    }

    @Bean
    public ImportsInputStreamProcessor importsInputStreamProcessor(ImportsRowProcessor<String> importsRowProcessor) {
        return new CsvImportsInputStreamProcessor(importsRowProcessor);
    }

    @Bean
    public ImportsRowProcessor importsRowProcessor() {
        return new TaskRowProcessor();
    }

    @Bean
    public ImportsChecker importsChecker() {
        return new TaskChecker();
    }

    @Bean
    public ImportsSaver importsSaver() {
        return new TaskSaver();
    }
}
