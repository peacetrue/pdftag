package com.mi.pdftag.listener;

import com.github.peacetrue.core.OperatorCapable;
import com.github.peacetrue.core.Operators;
import com.github.peacetrue.file.FileDelete;
import com.github.peacetrue.file.FileService;
import com.mi.pdftag.modules.phonetag.*;
import com.mi.pdftag.modules.tag.TagGeneratePdf;
import com.mi.pdftag.modules.tag.TagService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import reactor.core.scheduler.Schedulers;

/**
 * @author : xiayx
 * @since : 2020-11-28 05:29
 **/
@Slf4j
@Component
public class PhoneTagListener {

    @Autowired
    private TagService tagService;
    @Autowired
    private FileService fileService;

    private void generatePdf(PhoneTagVO vo, OperatorCapable<Long> payload) {
        PhoneTagState phoneTagState = PhoneTagState.findById(vo.getStateId());
        String versionType = phoneTagState.getVersionType().getCode();
        log.info("新增/修改标签[{}]后，生成[{}]版本的PDF文件", vo.getId(), versionType);
        //TODO 会阻塞后续IO线程，如何避免
        tagService.generatePdf(Operators.setOperator(payload, new TagGeneratePdf(versionType, vo)))
                .subscribeOn(Schedulers.elastic())
                .subscribe();
    }

    @EventListener
    public void generatePdfAfterPhoneTagAdd(PayloadApplicationEvent<PhoneTagAdd> event) {
        this.generatePdf((PhoneTagVO) event.getSource(), event.getPayload());
    }

    @EventListener
    public void generatePdfAfterPhoneTagModify(PayloadApplicationEvent<PhoneTagModify> event) {
        this.generatePdf((PhoneTagVO) event.getSource(), event.getPayload());
    }

    @EventListener
    public void deletePdfAfterPhoneTagDelete(PayloadApplicationEvent<PhoneTagDelete> event) {
        log.info("删除标签[{}]之后删除PDF", event.getPayload().getId());
        PhoneTagVO source = (PhoneTagVO) event.getSource();
        deletePdf(event, source.getReproductionPath());
        deletePdf(event, source.getProductionPath());
    }

    private void deletePdf(PayloadApplicationEvent<PhoneTagDelete> event, String filePath) {
        if (StringUtils.isEmpty(filePath)) return;
        fileService.delete(Operators.setOperator(event.getPayload(), new FileDelete(filePath)))
                .subscribeOn(Schedulers.elastic()).subscribe();
    }
}
