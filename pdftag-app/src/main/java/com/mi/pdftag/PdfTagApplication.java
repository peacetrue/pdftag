package com.mi.pdftag;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.spring.formatter.date.AutomaticDateFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticLocalDateFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticLocalDateTimeFormatter;
import com.github.peacetrue.spring.formatter.date.AutomaticTimeFormatter;
import com.github.peacetrue.spring.security.ServerHttpSecurityConfigurer;
import com.github.peacetrue.user.UserGet;
import com.github.peacetrue.user.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.MapSession;
import org.springframework.session.ReactiveMapSessionRepository;
import org.springframework.session.ReactiveSessionRepository;
import org.springframework.session.config.annotation.web.server.EnableSpringWebSession;
import org.springframework.transaction.annotation.AnnotationTransactionAttributeSource;
import org.springframework.transaction.annotation.ProxyTransactionManagementConfiguration;
import org.springframework.transaction.interceptor.DelegatingTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionAttribute;
import org.springframework.transaction.interceptor.TransactionAttributeSource;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.result.method.annotation.ArgumentResolverConfigurer;
import reactor.core.publisher.Mono;

import javax.annotation.Nullable;
import java.lang.reflect.AnnotatedElement;
import java.time.Duration;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;
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

    @Configuration
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public static class WebFluxConfig implements WebFluxConfigurer {

        @Autowired
        private ObjectMapper objectMapper;

        @Override
        public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
            configurer.defaultCodecs().jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper));
            configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper));
        }

        @Override
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

    @Getter
    @Setter
    public static class IdUser extends User implements IdCapable<Long> {

        private Long id;

        public IdUser(Long id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, authorities);
            this.id = id;
        }

        public IdUser(Long id, String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
            this.id = id;
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public ServerHttpSecurityConfigurer serverHttpSecurityConfigurer() {
        return http -> http.headers(headers -> headers
                .frameOptions(ServerHttpSecurity.HeaderSpec.FrameOptionsSpec::disable)
        );
    }

    @Bean
    public ReactiveUserDetailsService userDetailsService() {
        return new ReactiveUserDetailsService() {
            @Autowired
            private UserService userService;

            @Override
            public Mono<UserDetails> findByUsername(String username) {
                UserGet userGet = new UserGet(null, username);
                userGet.setOperatorId(0L);
                return userService.get(userGet)
                        .map(user -> {
                            Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
                            return new IdUser(user.getId(), user.getUsername(), user.getPassword(), authorities);
                        });
            }
        };
    }

    @Configuration
    public static class MyProxyTransactionManagementConfiguration extends ProxyTransactionManagementConfiguration {
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
}
