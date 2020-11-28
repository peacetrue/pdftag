package com.mi.pdftag.listener;

import com.github.peacetrue.attachment.AttachmentAdd;
import com.github.peacetrue.file.FileService;
import com.github.peacetrue.io.UnzipFiles;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.PayloadApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author : xiayx
 * @since : 2020-11-27 08:33
 **/
@Slf4j
@Component
public class AttachmentListener {

    @Autowired
    private FileService fileService;

    @Order(100)
    @EventListener
    public void unzip(PayloadApplicationEvent<AttachmentAdd> event) {
        AttachmentAdd attachmentAdd = event.getPayload();
        if (!attachmentAdd.getPath().endsWith(".zip")) return;

        log.info("上传附件后，解压zip文件[{}]", attachmentAdd.getPath());
        String absoluteFilePath = fileService.getAbsoluteFilePath(attachmentAdd.getPath());
        try {
            UnzipFiles.unzip(absoluteFilePath);
        } catch (IOException e) {
            log.error("解压zip文件[{}]异常", absoluteFilePath);
        }
    }
}
