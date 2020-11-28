package com.mi.pdftag.listener;

import com.mi.pdftag.modules.phonetag.PhoneTagAdd;
import com.mi.pdftag.modules.phonetag.PhoneTagVO;
import com.mi.pdftag.modules.tag.TagGeneratePdf;
import com.mi.pdftag.modules.tag.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * @author : xiayx
 * @since : 2020-11-28 05:29
 **/
@Slf4j
@Component
public class PhoneTagListener {

    @Autowired
    private TagService tagService;

    @EventListener
    public void generatePdfAfterPhoneTagAdd(PayloadApplicationEvent<PhoneTagAdd> event) {
        PhoneTagVO vo = (PhoneTagVO) event.getSource();
        log.info("新增 PhoneTag[{}] 后，生成所有版本的PDF文件", vo.getId());
        tagService.generatePdfAllVersion(new TagGeneratePdf(null, vo))
                .subscribe()
                .dispose();
    }

}
