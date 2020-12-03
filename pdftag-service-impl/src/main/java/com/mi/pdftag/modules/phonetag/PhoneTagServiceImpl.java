package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.OperatorCapable;
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
import org.springframework.util.ReflectionUtils;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import javax.annotation.Nullable;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

/**
 * 标签服务实现
 *
 * @author xiayx
 */
@Slf4j
@Service
public class PhoneTagServiceImpl implements PhoneTagService {

    @Autowired
    private R2dbcEntityTemplate entityTemplate;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    public static Criteria buildCriteria(PhoneTagQuery params) {
        return CriteriaUtils.and(
                CriteriaUtils.nullableCriteria(CriteriaUtils.smartIn("id"), params::getId),
                CriteriaUtils.nullableCriteria(Criteria.where("styleCode")::is, params::getStyleCode),
                CriteriaUtils.nullableCriteria(Criteria.where("templateId")::is, params::getTemplateId),
                CriteriaUtils.nullableCriteria(Criteria.where("goodsName")::like, value -> "%" + value + "%", params::getGoodsName),
                CriteriaUtils.nullableCriteria(Criteria.where("creatorId")::is, params::getCreatorId),
                CriteriaUtils.nullableCriteria(Criteria.where("createdTime")::greaterThanOrEquals, params.getCreatedTime()::getLowerBound),
                CriteriaUtils.nullableCriteria(Criteria.where("createdTime")::lessThan, DateUtils.DATE_CELL_EXCLUDE, params.getCreatedTime()::getUpperBound),
                CriteriaUtils.nullableCriteria(Criteria.where("modifierId")::is, params::getModifierId),
                CriteriaUtils.nullableCriteria(Criteria.where("modifiedTime")::greaterThanOrEquals, params.getModifiedTime()::getLowerBound),
                CriteriaUtils.nullableCriteria(Criteria.where("modifiedTime")::lessThan, DateUtils.DATE_CELL_EXCLUDE, params.getModifiedTime()::getUpperBound),
                CriteriaUtils.nullableCriteria(Criteria.where("stateId")::is, params::getStateId)
        );
    }

    @Override
    @Transactional
    public Mono<PhoneTagVO> add(PhoneTagAdd params) {
        log.info("新增标签信息[{}]", params);
        if (params.getStateId() == null) params.setStateId(PhoneTagState.DRAFT.getId());
        PhoneTag entity = BeanUtils.map(params, PhoneTag.class);
        setDefaultValue(entity);
        entity.setCreatorId(params.getOperatorId());
        entity.setCreatedTime(LocalDateTime.now());
        entity.setModifierId(entity.getCreatorId());
        entity.setModifiedTime(entity.getCreatedTime());
        return entityTemplate.insert(entity)
                .map(item -> BeanUtils.map(item, PhoneTagVO.class))
                .doOnNext(item -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(item, params)))
                ;
    }

    public static void setDefaultValue(Object object) {
        PropertyDescriptor[] descriptors = BeanUtils.getPropertyDescriptors(object.getClass());
        Arrays.stream(descriptors).forEach(descriptor -> {
            if (descriptor.getPropertyType() == String.class) {
                Method readMethod = descriptor.getReadMethod();
                Object value = ReflectionUtils.invokeMethod(readMethod, object);
                if (value == null) {
                    Method writeMethod = descriptor.getWriteMethod();
                    ReflectionUtils.invokeMethod(writeMethod, object, "");
                }
            }
        });
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<Page<PhoneTagVO>> query(@Nullable PhoneTagQuery params, @Nullable Pageable pageable, String... projection) {
        log.info("分页查询标签信息[{}]", params);
        if (params == null) params = PhoneTagQuery.DEFAULT;
        if (params.getCreatedTime() == null) params.setCreatedTime(Range.LocalDateTime.DEFAULT);
        if (params.getModifiedTime() == null) params.setModifiedTime(Range.LocalDateTime.DEFAULT);
        Pageable finalPageable = pageable == null ? PageRequest.of(0, 10) : pageable;
        Criteria where = buildCriteria(params);

        return entityTemplate.count(Query.query(where), PhoneTag.class)
                .flatMap(total -> total == 0L ? Mono.empty() : Mono.just(total))
                .<Page<PhoneTagVO>>flatMap(total -> {
                    Query query = Query.query(where).with(finalPageable).sort(finalPageable.getSortOr(Sort.by("createdTime").descending()));
                    return entityTemplate.select(query, PhoneTag.class)
                            .map(item -> BeanUtils.map(item, PhoneTagVO.class))
                            .reduce(new ArrayList<>(), StreamUtils.reduceToCollection())
                            .map(item -> new PageImpl<>(item, finalPageable, total));
                })
                .switchIfEmpty(Mono.just(new PageImpl<>(Collections.emptyList(), finalPageable, 0L)));
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<PhoneTagVO> query(@Nullable PhoneTagQuery params, @Nullable Sort sort, String... projection) {
        log.info("全量查询标签信息[{}]", params);
        if (params == null) params = PhoneTagQuery.DEFAULT;
        if (params.getCreatedTime() == null) params.setCreatedTime(Range.LocalDateTime.DEFAULT);
        if (params.getModifiedTime() == null) params.setModifiedTime(Range.LocalDateTime.DEFAULT);
        if (sort == null) sort = Sort.by("createdTime").descending();
        Criteria where = buildCriteria(params);
        Query query = Query.query(where).sort(sort).limit(100);
        return entityTemplate.select(query, PhoneTag.class)
                .map(item -> BeanUtils.map(item, PhoneTagVO.class));
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<PhoneTagVO> get(PhoneTagGet params, String... projection) {
        log.info("获取标签信息[{}]", params);
//        Criteria where = CriteriaUtils.and(
//                CriteriaUtils.nullableCriteria(Criteria.where("id")::is, params::getId),
//        );
        Criteria where = Criteria.where("id").is(params.getId());
        return entityTemplate.selectOne(Query.query(where), PhoneTag.class)
                .map(item -> BeanUtils.map(item, PhoneTagVO.class));
    }

    @Override
    @Transactional
    public Mono<Integer> modify(PhoneTagModify params) {
        log.info("修改标签信息[{}]", params);
        return this.modifyGeneric(params);
    }

    @Override
    @Transactional
    public Mono<Integer> modifyPdfPath(PhoneTagModifyPdfPath params) {
        log.info("修改标签PDF路径信息[{}]", params);
        return this.modifyGeneric(params);
    }

    private  <T extends IdCapable<Long> & OperatorCapable<Long>> Mono<Integer> modifyGeneric(T params) {
        Criteria where = Criteria.where("id").is(params.getId());
        Query idQuery = Query.query(where);
        return entityTemplate.selectOne(idQuery, PhoneTag.class)
                .zipWhen(entity -> {
                    PhoneTag modify = BeanUtils.map(params, PhoneTag.class);
                    modify.setModifierId(params.getOperatorId());
                    modify.setModifiedTime(LocalDateTime.now());
                    Update update = UpdateUtils.selectiveUpdateFromExample(modify);
                    return entityTemplate.update(idQuery, update, PhoneTag.class);
                })
                .map(tuple2 -> {
                    PhoneTagVO vo = BeanUtils.map(tuple2.getT1(), PhoneTagVO.class);
                    BeanUtils.copyProperties(params, vo, BeanUtils.EMPTY_PROPERTY_VALUE);
                    eventPublisher.publishEvent(new PayloadApplicationEvent<>(vo, params));
                    return tuple2.getT2();
                })
                .switchIfEmpty(Mono.just(0));
    }

    @Override
    @Transactional
    public Mono<Integer> delete(PhoneTagDelete params) {
        log.info("删除标签信息[{}]", params);
        Criteria where = Criteria.where("id").is(params.getId());
        Query idQuery = Query.query(where);
        return entityTemplate.selectOne(idQuery, PhoneTag.class)
                .map(item -> BeanUtils.map(item, PhoneTagVO.class))
                .zipWhen(region -> entityTemplate.delete(idQuery, PhoneTag.class))
                .doOnNext(tuple2 -> eventPublisher.publishEvent(new PayloadApplicationEvent<>(tuple2.getT1(), params)))
                .map(Tuple2::getT2)
                .switchIfEmpty(Mono.just(0));
    }

}
