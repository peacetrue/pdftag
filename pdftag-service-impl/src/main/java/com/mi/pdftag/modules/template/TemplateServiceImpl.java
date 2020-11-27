package com.mi.pdftag.modules.template;

import com.github.peacetrue.core.Range;
import com.github.peacetrue.spring.data.relational.core.query.CriteriaUtils;
import com.github.peacetrue.spring.data.relational.core.query.UpdateUtils;
import com.github.peacetrue.spring.util.BeanUtils;
import com.github.peacetrue.util.DateUtils;
import com.github.peacetrue.util.StreamUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.data.domain.*;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.data.relational.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import javax.annotation.Nullable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;

/**
 * 模版服务实现
 *
 * @author xiayx
 */
@Slf4j
@Service
public class TemplateServiceImpl implements TemplateService {

    @Autowired
    private R2dbcEntityTemplate entityTemplate;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public static Criteria buildCriteria(TemplateQuery params) {
        return CriteriaUtils.and(
                CriteriaUtils.nullableCriteria(CriteriaUtils.smartIn("id"), params::getId),
                CriteriaUtils.nullableCriteria(Criteria.where("code")::like, value -> "%" + value + "%", params::getCode),
                CriteriaUtils.nullableCriteria(Criteria.where("name")::like, value -> "%" + value + "%", params::getName),
                CriteriaUtils.nullableCriteria(Criteria.where("creatorId")::is, params::getCreatorId),
                CriteriaUtils.nullableCriteria(Criteria.where("createdTime")::greaterThanOrEquals, params.getCreatedTime()::getLowerBound),
                CriteriaUtils.nullableCriteria(Criteria.where("createdTime")::lessThan, DateUtils.DATE_CELL_EXCLUDE, params.getCreatedTime()::getUpperBound),
                CriteriaUtils.nullableCriteria(Criteria.where("modifierId")::is, params::getModifierId),
                CriteriaUtils.nullableCriteria(Criteria.where("modifiedTime")::greaterThanOrEquals, params.getModifiedTime()::getLowerBound),
                CriteriaUtils.nullableCriteria(Criteria.where("modifiedTime")::lessThan, DateUtils.DATE_CELL_EXCLUDE, params.getModifiedTime()::getUpperBound)
        );
    }

    @Override
    @Transactional
    public Mono<TemplateVO> add(TemplateAdd params) {
        log.info("新增模版信息[{}]", params);
        Template entity = BeanUtils.map(params, Template.class);
        entity.setContent("");
        entity.setCreatorId(params.getOperatorId());
        entity.setCreatedTime(LocalDateTime.now());
        entity.setModifierId(entity.getCreatorId());
        entity.setModifiedTime(entity.getCreatedTime());
        return entityTemplate.insert(entity)
                .map(item -> BeanUtils.map(item, TemplateVO.class))
                .doOnNext(item -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(item, params)));
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<Page<TemplateVO>> query(@Nullable TemplateQuery params, @Nullable Pageable pageable, String... projection) {
        log.info("分页查询模版信息[{}]", params);
        if (params == null) params = TemplateQuery.DEFAULT;
        if (params.getCreatedTime() == null) params.setCreatedTime(Range.LocalDateTime.DEFAULT);
        if (params.getModifiedTime() == null) params.setModifiedTime(Range.LocalDateTime.DEFAULT);
        Pageable finalPageable = pageable == null ? PageRequest.of(0, 10) : pageable;
        Criteria where = buildCriteria(params);

        return entityTemplate.count(Query.query(where), Template.class)
                .flatMap(total -> total == 0L ? Mono.empty() : Mono.just(total))
                .<Page<TemplateVO>>flatMap(total -> {
                    Query query = Query.query(where).with(finalPageable).sort(finalPageable.getSortOr(Sort.by("createdTime").descending()));
                    return entityTemplate.select(query, Template.class)
                            .map(item -> BeanUtils.map(item, TemplateVO.class))
                            .reduce(new ArrayList<>(), StreamUtils.reduceToCollection())
                            .map(item -> new PageImpl<>(item, finalPageable, total));
                })
                .switchIfEmpty(Mono.just(new PageImpl<>(Collections.emptyList(), finalPageable, 0L)));
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<TemplateVO> query(@Nullable TemplateQuery params, @Nullable Sort sort, String... projection) {
        log.info("全量查询模版信息[{}]", params);
        if (params == null) params = TemplateQuery.DEFAULT;
        if (params.getCreatedTime() == null) params.setCreatedTime(Range.LocalDateTime.DEFAULT);
        if (params.getModifiedTime() == null) params.setModifiedTime(Range.LocalDateTime.DEFAULT);
        if (sort == null) sort = Sort.by("createdTime").descending();
        Criteria where = buildCriteria(params);
        Query query = Query.query(where).sort(sort).limit(100);
        return entityTemplate.select(query, Template.class)
                .map(item -> BeanUtils.map(item, TemplateVO.class));
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<TemplateVO> get(TemplateGet params, String... projection) {
        log.info("获取模版信息[{}]", params);
//        Criteria where = CriteriaUtils.and(
//                CriteriaUtils.nullableCriteria(Criteria.where("id")::is, params::getId),
//        );
        Criteria where = Criteria.where("id").is(params.getId());
        return entityTemplate.selectOne(Query.query(where), Template.class)
                .map(item -> BeanUtils.map(item, TemplateVO.class));
    }

    @Override
    @Transactional
    public Mono<Integer> modify(TemplateModify params) {
        log.info("修改模版信息[{}]", params);
        Criteria where = Criteria.where("id").is(params.getId());
        Query idQuery = Query.query(where);
        return entityTemplate.selectOne(idQuery, Template.class)
                .map(item -> BeanUtils.map(item, TemplateVO.class))
                .zipWhen(entity -> {
                    Template modify = BeanUtils.map(params, Template.class);
                    entity.setContent("");
                    modify.setModifierId(params.getOperatorId());
                    modify.setModifiedTime(LocalDateTime.now());
                    Update update = UpdateUtils.selectiveUpdateFromExample(modify);
                    return entityTemplate.update(idQuery, update, Template.class);
                })
                .doOnNext(tuple2 -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(tuple2.getT1(), params)))
                .map(Tuple2::getT2)
                .switchIfEmpty(Mono.just(0));
    }

    @Override
    @Transactional
    public Mono<Integer> delete(TemplateDelete params) {
        log.info("删除模版信息[{}]", params);
        Criteria where = Criteria.where("id").is(params.getId());
        Query idQuery = Query.query(where);
        return entityTemplate.selectOne(idQuery, Template.class)
                .map(item -> BeanUtils.map(item, TemplateVO.class))
                .zipWhen(region -> entityTemplate.delete(idQuery, Template.class))
                .doOnNext(tuple2 -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(tuple2.getT1(), params)))
                .map(Tuple2::getT2)
                .switchIfEmpty(Mono.just(0));
    }

}
