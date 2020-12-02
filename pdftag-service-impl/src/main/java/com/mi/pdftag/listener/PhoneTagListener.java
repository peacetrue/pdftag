package com.mi.pdftag.listener;

import com.github.peacetrue.core.OperatorCapable;
import com.github.peacetrue.core.Operators;
import com.github.peacetrue.file.FileDelete;
import com.github.peacetrue.file.FileService;
import com.github.peacetrue.operator.PdfTagOperatorUtils;
import com.mi.pdftag.modules.phonetag.PhoneTagAdd;
import com.mi.pdftag.modules.phonetag.PhoneTagDelete;
import com.mi.pdftag.modules.phonetag.PhoneTagModify;
import com.mi.pdftag.modules.phonetag.PhoneTagVO;
import com.mi.pdftag.modules.tag.TagGeneratePdf;
import com.mi.pdftag.modules.tag.TagService;
import lombok.extern.slf4j.Slf4j;
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

    @EventListener
    public void generatePdfAfterPhoneTagAdd(PayloadApplicationEvent<PhoneTagAdd> event) {
        PhoneTagVO vo = (PhoneTagVO) event.getSource();
        log.info("新增标签[{}] 后，生成所有版本的PDF文件", vo.getId());
        this.generatePdf(vo, event.getPayload());
    }

    @EventListener
    public void generatePdfAfterPhoneTagModify(PayloadApplicationEvent<PhoneTagModify> event) {
        PhoneTagVO vo = (PhoneTagVO) event.getSource();
        log.info("修改标签[{}] 后，生成所有版本的PDF文件", vo.getId());
        this.generatePdf(vo, event.getPayload());
    }

    private void generatePdf(PhoneTagVO vo, OperatorCapable<Long> payload) {
        TagGeneratePdf params = PdfTagOperatorUtils.setOperator(
                payload,
                new TagGeneratePdf(null, vo)
        );
        tagService.generatePdfAllVersion(params).publishOn(Schedulers.elastic()).subscribe();
    }

    @Autowired
    private FileService fileService;

    @EventListener
    public void deletePdfAfterPhoneTagDelete(PayloadApplicationEvent<PhoneTagDelete> event) {
        log.info("删除标签[{}]之后删除PDF", event.getPayload().getId());
        PhoneTagVO source = (PhoneTagVO) event.getSource();

        if (source.getReproductionPath() != null) {
            fileService.delete(Operators.setOperator(event.getPayload(), new FileDelete(source.getReproductionPath())))
                    .publishOn(Schedulers.elastic()).subscribe();
        }

        if (source.getProductionPath() != null) {
            fileService.delete(Operators.setOperator(event.getPayload(), new FileDelete(source.getProductionPath())))
                    .publishOn(Schedulers.elastic()).subscribe();
        }
    }
}
