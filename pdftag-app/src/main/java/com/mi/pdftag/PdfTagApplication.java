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
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.result.method.annotation.ArgumentResolverConfigurer;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

/**
 * @author xiayx
 */
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

}
