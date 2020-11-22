package com.mi.pdftag.modules.phonetag;

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
 * 标签客户端
 *
 * @author xiayx
 */
@ReactiveFeignClient(name = "pdftag", url = "${peacetrue.PhoneTag.url:${peacetrue.server.url:}}")
public interface PhoneTagServiceClient {

    @PostMapping(value = "/phone-tags")
    Mono<PhoneTagVO> add(PhoneTagAdd params);

    @GetMapping(value = "/phone-tags", params = "page")
    Mono<Page<PhoneTagVO>> query(@Nullable @SpringQueryMap PhoneTagQuery params, @Nullable Pageable pageable, @SpringQueryMap String... projection);

    @GetMapping(value = "/phone-tags", params = "sort")
    Flux<PhoneTagVO> query(@SpringQueryMap PhoneTagQuery params, Sort sort, @SpringQueryMap String... projection);

    @GetMapping(value = "/phone-tags")
    Flux<PhoneTagVO> query(@SpringQueryMap PhoneTagQuery params, @SpringQueryMap String... projection);

    @GetMapping(value = "/phone-tags/get")
    Mono<PhoneTagVO> get(@SpringQueryMap PhoneTagGet params, @SpringQueryMap String... projection);

    @PutMapping(value = "/phone-tags")
    Mono<Integer> modify(PhoneTagModify params);

    @DeleteMapping(value = "/phone-tags/delete")
    Mono<Integer> delete(@SpringQueryMap PhoneTagDelete params);

}
