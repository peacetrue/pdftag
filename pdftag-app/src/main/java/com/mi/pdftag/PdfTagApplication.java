package com.mi.pdftag;

import com.github.peacetrue.result.Result;
import com.github.peacetrue.result.ResultImpl;
import com.github.peacetrue.result.ResultType;
import com.github.peacetrue.spring.formatter.date.AutomaticDateFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticLocalDateFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticLocalDateTimeFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticTimeFormatter;
import com.github.peacetrue.spring.security.ServerHttpSecurityConfigurer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.session.SessionProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.data.web.ReactivePageableHandlerMethodArgumentResolver;
import org.springframework.data.web.ReactiveSortHandlerMethodArgumentResolver;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.session.MapSession;
import org.springframework.session.ReactiveMapSessionRepository;
import org.springframework.session.ReactiveSessionRepository;
import org.springframework.session.config.annotation.web.server.EnableSpringWebSession;
import org.springframework.transaction.annotation.AnnotationTransactionAttributeSource;
import org.springframework.transaction.annotation.ProxyTransactionManagementConfiguration;
import org.springframework.transaction.interceptor.DelegatingTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionAttribute;
import org.springframework.transaction.interceptor.TransactionAttributeSource;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.result.method.annotation.ArgumentResolverConfigurer;

import javax.annotation.Nullable;
import java.lang.reflect.AnnotatedElement;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author xiayx
 */
@EnableSpringWebSession
@SpringBootApplication
public class PdfTagApplication {

    public static void main(String[] args) {
        SpringApplication.run(PdfTagApplication.class, args);
    }

    @Configuration(proxyBeanMethods = false)
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public static class WebFluxConfig implements WebFluxConfigurer {

        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("*")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
        }

        @Override
        public void configureArgumentResolvers(ArgumentResolverConfigurer configurer) {
            configurer.addCustomResolver(new ReactivePageableHandlerMethodArgumentResolver());
            configurer.addCustomResolver(new ReactiveSortHandlerMethodArgumentResolver());
        }

        @Override
        public void addFormatters(FormatterRegistry registry) {
            registry.addFormatter(new AutomaticDateFormatter());
            registry.addFormatter(new AutomaticTimeFormatter());
            registry.addFormatter(new AutomaticLocalDateFormatter());
            registry.addFormatter(new AutomaticLocalDateTimeFormatter());
        }
    }


    @Bean
    @Order(0)
    public ServerHttpSecurityConfigurer serverHttpSecurityConfigurer() {
        // iframe 可以跨域访问本项目内的资源
        return http -> http.headers(headers -> headers.frameOptions(ServerHttpSecurity.HeaderSpec.FrameOptionsSpec::disable))
//                .authorizeExchange()
//                .pathMatchers("/*/delete").hasRole("ROLE_ADMIN")
//                .pathMatchers(HttpMethod.DELETE).hasRole("ROLE_ADMIN")
                ;
    }

    @Configuration
    public static class ExceptionProxyTransactionManagementConfiguration extends ProxyTransactionManagementConfiguration {
        @Bean
        @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
        public TransactionAttributeSource transactionAttributeSource() {
            return new AnnotationTransactionAttributeSource() {
                @Nullable
                protected TransactionAttribute determineTransactionAttribute(AnnotatedElement element) {
                    TransactionAttribute ta = super.determineTransactionAttribute(element);
                    if (ta == null) return null;
                    return new DelegatingTransactionAttribute(ta) {
                        @Override
                        public boolean rollbackOn(Throwable ex) {
                            return super.rollbackOn(ex) || ex instanceof Exception;
                        }
                    };
                }
            };
        }
    }

    @Bean
    public ReactiveSessionRepository<MapSession> reactiveSessionRepository(SessionProperties properties) {
        ReactiveMapSessionRepository repository = new ReactiveMapSessionRepository(new ConcurrentHashMap<>());
        Duration timeout = properties.getTimeout();
        if (timeout != null) repository.setDefaultMaxInactiveInterval((int) timeout.toSeconds());
        return repository;
    }


//    @Bean
//    public ServerAuthenticationSuccessHandler successLoginHandler() {
//        return (webFilterExchange, authentication) -> webFilterExchange.getExchange().getSession()
//                .doOnNext(session -> session.setMaxIdleTime(Duration.ofMinutes(1)))
//                .then();
//    }

    @Slf4j
    @RestControllerAdvice
    public static class GlobalExceptionHandler {
        @ExceptionHandler(Exception.class)
        public ResponseEntity<Result> handle(Exception exception) {
            log.warn("接收到控制层抛出的异常", exception);
            ResultImpl result = new ResultImpl(ResultType.failure.name(), exception.getMessage());
            return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
