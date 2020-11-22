package com.mi.pdftag.modules.template;

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
 * 模版控制器
 *
 * @author xiayx
 */
@Slf4j
@RestController
@RequestMapping(value = "/templates")
public class TemplateController {

    @Autowired
    private TemplateService templateService;

    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<TemplateVO> addByForm(TemplateAdd params) {
        log.info("新增模版信息(请求方法+表单参数)[{}]", params);
        return templateService.add(params);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<TemplateVO> addByJson(@RequestBody TemplateAdd params) {
        log.info("新增模版信息(请求方法+JSON参数)[{}]", params);
        return templateService.add(params);
    }

    @GetMapping(params = "page")
    public Mono<Page<TemplateVO>> query(TemplateQuery params, Pageable pageable, String... projection) {
        log.info("分页查询模版信息(请求方法+参数变量)[{}]", params);
        return templateService.query(params, pageable, projection);
    }

    @GetMapping
    public Flux<TemplateVO> query(TemplateQuery params, Sort sort, String... projection) {
        log.info("全量查询模版信息(请求方法+参数变量)[{}]", params);
        return templateService.query(params, sort, projection);
    }

    @GetMapping("/{id}")
    public Mono<TemplateVO> getByUrlPathVariable(@PathVariable Long id, String... projection) {
        log.info("获取模版信息(请求方法+路径变量)详情[{}]", id);
        return templateService.get(new TemplateGet(id), projection);
    }

    @RequestMapping("/get")
    public Mono<TemplateVO> getByPath(TemplateGet params, String... projection) {
        log.info("获取模版信息(请求路径+参数变量)详情[{}]", params);
        return templateService.get(params, projection);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public Mono<Integer> modifyByForm(TemplateModify params) {
        log.info("修改模版信息(请求方法+表单参数)[{}]", params);
        return templateService.modify(params);
    }

    @PutMapping(value = {"", "/*"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Integer> modifyByJson(@RequestBody TemplateModify params) {
        log.info("修改模版信息(请求方法+JSON参数)[{}]", params);
        return templateService.modify(params);
    }

    @DeleteMapping("/{id}")
    public Mono<Integer> deleteByUrlPathVariable(@PathVariable Long id) {
        log.info("删除模版信息(请求方法+URL路径变量)[{}]", id);
        return templateService.delete(new TemplateDelete(id));
    }

    @DeleteMapping(params = "id")
    public Mono<Integer> deleteByUrlParamVariable(TemplateDelete params) {
        log.info("删除模版信息(请求方法+URL参数变量)[{}]", params);
        return templateService.delete(params);
    }

    @RequestMapping(path = "/delete")
    public Mono<Integer> deleteByPath(TemplateDelete params) {
        log.info("删除模版信息(请求路径+URL参数变量)[{}]", params);
        return templateService.delete(params);
    }


}
