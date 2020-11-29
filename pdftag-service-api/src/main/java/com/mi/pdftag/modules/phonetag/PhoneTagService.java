package com.mi.pdftag.modules.phonetag;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Nullable;

/**
 * 标签服务接口
 *
 * @author xiayx
 */
public interface PhoneTagService {

    /** 新增 */
    Mono<PhoneTagVO> add(PhoneTagAdd params);

    /** 分页查询 */
    Mono<Page<PhoneTagVO>> query(@Nullable PhoneTagQuery params, @Nullable Pageable pageable, String... projection);

    /** 全量查询 */
    Flux<PhoneTagVO> query(PhoneTagQuery params, @Nullable Sort sort, String... projection);

    /** 全量查询 */
    default Flux<PhoneTagVO> query(PhoneTagQuery params, String... projection) {
        return this.query(params, (Sort) null, projection);
    }

    /** 获取 */
    Mono<PhoneTagVO> get(PhoneTagGet params, String... projection);

    /** 修改 */
    Mono<Integer> modify(PhoneTagModify params);

    /** 修改生成的PDF路径 */
    Mono<Integer> modifyPdfPath(PhoneTagModifyPdfPath params);

    /** 删除 */
    Mono<Integer> delete(PhoneTagDelete params);


}
