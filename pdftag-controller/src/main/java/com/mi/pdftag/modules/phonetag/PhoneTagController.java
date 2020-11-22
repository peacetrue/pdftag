package com.mi.pdftag.modules.phonetag;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * 标签控制器
 *
 * @author xiayx
 */
@Slf4j
@RestController
@RequestMapping(value = "/phone-tags")
public class PhoneTagController {

    @Autowired
    private PhoneTagService phoneTagService;

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<PhoneTagVO> addByForm(PhoneTagAdd params) {
        log.info("新增标签信息(请求方法+表单参数)[{}]", params);
        return phoneTagService.add(params);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<PhoneTagVO> addByJson(@RequestBody PhoneTagAdd params) {
        log.info("新增标签信息(请求方法+JSON参数)[{}]", params);
        return phoneTagService.add(params);
    }

    @GetMapping(params = "page")
    public Mono<Page<PhoneTagVO>> query(PhoneTagQuery params, Pageable pageable, String... projection) {
        log.info("分页查询标签信息(请求方法+参数变量)[{}]", params);
        return phoneTagService.query(params, pageable, projection);
    }

    @GetMapping
    public Flux<PhoneTagVO> query(PhoneTagQuery params, Sort sort, String... projection) {
        log.info("全量查询标签信息(请求方法+参数变量)[{}]", params);
        return phoneTagService.query(params, sort, projection);
    }

    @GetMapping("/{id}")
    public Mono<PhoneTagVO> getByUrlPathVariable(@PathVariable Long id, String... projection) {
        log.info("获取标签信息(请求方法+路径变量)详情[{}]", id);
        return phoneTagService.get(new PhoneTagGet(id), projection);
    }

    @RequestMapping("/get")
    public Mono<PhoneTagVO> getByPath(PhoneTagGet params, String... projection) {
        log.info("获取标签信息(请求路径+参数变量)详情[{}]", params);
        return phoneTagService.get(params, projection);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<Integer> modifyByForm(PhoneTagModify params) {
        log.info("修改标签信息(请求方法+表单参数)[{}]", params);
        return phoneTagService.modify(params);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Integer> modifyByJson(@RequestBody PhoneTagModify params) {
        log.info("修改标签信息(请求方法+JSON参数)[{}]", params);
        return phoneTagService.modify(params);
    }

    @DeleteMapping("/{id}")
    public Mono<Integer> deleteByUrlPathVariable(@PathVariable Long id) {
        log.info("删除标签信息(请求方法+URL路径变量)[{}]", id);
        return phoneTagService.delete(new PhoneTagDelete(id));
    }

    @DeleteMapping(params = "id")
    public Mono<Integer> deleteByUrlParamVariable(PhoneTagDelete params) {
        log.info("删除标签信息(请求方法+URL参数变量)[{}]", params);
        return phoneTagService.delete(params);
    }

    @RequestMapping(path = "/delete")
    public Mono<Integer> deleteByPath(PhoneTagDelete params) {
        log.info("删除标签信息(请求路径+URL参数变量)[{}]", params);
        return phoneTagService.delete(params);
    }


}
