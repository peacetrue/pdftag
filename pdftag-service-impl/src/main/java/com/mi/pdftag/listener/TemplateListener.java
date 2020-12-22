package com.mi.pdftag.listener;

import com.github.peacetrue.attachment.AttachmentDelete;
import com.github.peacetrue.attachment.AttachmentService;
import com.github.peacetrue.core.Operators;
import com.mi.pdftag.modules.template.TemplateDelete;
import com.mi.pdftag.modules.template.TemplateVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import reactor.core.scheduler.Schedulers;

/**
 * @author : xiayx
 * @since : 2020-12-05 18:59
 **/
@Slf4j
@Component
public class TemplateListener {

    @Autowired
    private AttachmentService attachmentService;

    @Order(0)
    @EventListener
    public void deleteAttachmentAfterTemplateDelete(PayloadApplicationEvent<TemplateDelete> event) {
        TemplateVO source = (TemplateVO) event.getSource();
        log.info("删除模版[{}]后，删除关联的附件[{}]", source.getId(), source.getAttachmentId());
        AttachmentDelete attachmentDelete = new AttachmentDelete(source.getAttachmentId());
        attachmentService.delete(Operators.setOperator(event.getPayload(), attachmentDelete))
                .subscribeOn(Schedulers.elastic())
                .subscribe();
    }
}
