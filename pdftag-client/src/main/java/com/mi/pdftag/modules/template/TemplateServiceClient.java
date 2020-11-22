package com.mi.pdftag.modules.template;

import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import reactivefeign.spring.config.ReactiveFeignClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nullable;

/**
 * 模版客户端
 *
 * @author xiayx
 */
@ReactiveFeignClient(name = "pdftag", url = "${peacetrue.Template.url:${peacetrue.server.url:}}")
public interface TemplateServiceClient {

    @PostMapping(value = "/templates")
    Mono<TemplateVO> add(TemplateAdd params);

    @GetMapping(value = "/templates", params = "page")
    Mono<Page<TemplateVO>> query(@Nullable @SpringQueryMap TemplateQuery params, @Nullable Pageable pageable, @SpringQueryMap String... projection);

    @GetMapping(value = "/templates", params = "sort")
    Flux<TemplateVO> query(@SpringQueryMap TemplateQuery params, Sort sort, @SpringQueryMap String... projection);

    @GetMapping(value = "/templates")
    Flux<TemplateVO> query(@SpringQueryMap TemplateQuery params, @SpringQueryMap String... projection);

    @GetMapping(value = "/templates/get")
    Mono<TemplateVO> get(@SpringQueryMap TemplateGet params, @SpringQueryMap String... projection);

    @PutMapping(value = "/templates")
    Mono<Integer> modify(TemplateModify params);

    @DeleteMapping(value = "/templates/delete")
    Mono<Integer> delete(@SpringQueryMap TemplateDelete params);

}
