package com.mi.pdftag.modules.template;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nullable;

/**
 * 模版服务接口
 *
 * @author xiayx
 */
public interface TemplateService {

    /** 新增 */
    Mono<TemplateVO> add(TemplateAdd params);

    /** 分页查询 */
    Mono<Page<TemplateVO>> query(@Nullable TemplateQuery params, @Nullable Pageable pageable, String... projection);

    /** 全量查询 */
    Flux<TemplateVO> query(TemplateQuery params, @Nullable Sort sort, String... projection);

    /** 全量查询 */
    default Flux<TemplateVO> query(TemplateQuery params, String... projection) {
        return this.query(params, (Sort) null, projection);
    }

    /** 获取 */
    Mono<TemplateVO> get(TemplateGet params, String... projection);

    /** 修改 */
    Mono<Integer> modify(TemplateModify params);

    /** 删除 */
    Mono<Integer> delete(TemplateDelete params);

}
