package com.mi.pdftag.listener;

import com.github.peacetrue.operator.PdfTagOperatorUtils;
import com.github.peacetrue.spring.util.BeanUtils;
import com.mi.pdftag.modules.phonetag.PhoneTagModify;
import com.mi.pdftag.modules.phonetag.PhoneTagModifyPdfPath;
import com.mi.pdftag.modules.phonetag.PhoneTagService;
import com.mi.pdftag.modules.phonetag.PhoneTagVO;
import com.mi.pdftag.modules.tag.TagGeneratePdf;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import reactor.core.scheduler.Schedulers;

import java.util.Map;

/**
 * @author : xiayx
 * @since : 2020-11-29 05:12
 **/
@Slf4j
@Component
public class TagListener {

    @Autowired
    private PhoneTagService phoneTagService;

    @SuppressWarnings("unchecked")
    @EventListener
    public void modifyPhoneTagPdfPathAfterGeneratePdf(PayloadApplicationEvent<TagGeneratePdf> event) {
        TagGeneratePdf payload = event.getPayload();
        //当且仅当所有PDF打印完成时触发
        if (!(payload.getTag() instanceof PhoneTagVO) || payload.getVersionType() != null) return;

        PhoneTagVO tag = (PhoneTagVO) payload.getTag();
        log.info("生成PDF文件后，设置关联标签的路径");

        PhoneTagModifyPdfPath params = new PhoneTagModifyPdfPath();
        params.setId(tag.getId());
        Map<String, String> source = (Map<String, String>) event.getSource();
        for (Map.Entry<String, String> entry : source.entrySet()) {
            BeanUtils.setPropertyValue(params, entry.getKey() + "Path", entry.getValue());
        }

        phoneTagService.modifyPdfPath(PdfTagOperatorUtils.setOperator(payload, params))
                .publishOn(Schedulers.elastic())
                .subscribe();
    }
}
