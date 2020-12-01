package com.mi.pdftag.listener;

import com.github.peacetrue.attachment.AttachmentAdd;
import com.github.peacetrue.attachment.AttachmentDelete;
import com.github.peacetrue.attachment.AttachmentVO;
import com.github.peacetrue.core.Operators;
import com.github.peacetrue.file.FileDelete;
import com.github.peacetrue.file.FileService;
import com.github.peacetrue.util.PdfTagFileUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;

/**
 * @author : xiayx
 * @since : 2020-11-27 08:33
 **/
@Slf4j
@Component
public class AttachmentListenerInPdfTag {

    public final static int ZIP_EXTENSION_LENGTH = ".zip".length();

    @Autowired
    private FileService fileService;

    @Async
    @Order(10)
    @EventListener
    public void unzipAfterAttachmentAdd(PayloadApplicationEvent<AttachmentAdd> event) {
        AttachmentAdd attachmentAdd = event.getPayload();
        if (!attachmentAdd.getPath().endsWith(".zip")) return;

        AttachmentVO attachmentVO = (AttachmentVO) event.getSource();
        log.info("上传附件[{}]后，解压 zip 文件", attachmentAdd.getPath());
        //TODO 解压出来的目录可能与实际 zip 包目录不同，例如 Mi_giftBox_label_Cn(1).zip -> Mi_giftBox_label_Cn
        String absoluteFilePath = fileService.getAbsolutePath(attachmentVO.getPath());
        try {
            PdfTagFileUtils.unzip(absoluteFilePath);
        } catch (IOException e) {
            log.error("解压 zip 文件[{}]异常", absoluteFilePath);
        }
    }

    @Order(11)
    @EventListener
    public void deleteLocalUnzipFileAfterAttachmentDelete(PayloadApplicationEvent<AttachmentDelete> event) {
        AttachmentVO source = (AttachmentVO) event.getSource();
        String folderPath = source.getPath().substring(0, source.getPath().length() - ZIP_EXTENSION_LENGTH);
        log.info("删除附件[{}]后，删除本地解压缩目录[{}]", source.getId(), folderPath);
        fileService.delete(Operators.setOperator(event.getPayload(), new FileDelete(folderPath)))
                .publishOn(Schedulers.elastic())
                .subscribe(result -> {
                    if (result > 0) log.info("文件[{}]删除成功", source.getPath());
                    else log.warn("文件[{}]删除失败", source.getPath());
                });
    }

}
