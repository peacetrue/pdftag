package com.mi.pdftag.modules.phonetag.imports;

import com.github.peacetrue.imports.ImportsContext;
import com.github.peacetrue.imports.ImportsSaver;
import com.github.peacetrue.imports.RowNumberWrapper;
import com.mi.pdftag.modules.phonetag.PhoneTagAdd;
import com.mi.pdftag.modules.phonetag.PhoneTagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.scheduler.Schedulers;

import java.util.List;

/**
 * @author xiayx
 */
@Slf4j
public class TaskSaver implements ImportsSaver<PhoneTagAdd> {

    @Autowired
    private PhoneTagService phoneTagService;

    @Override
    @SuppressWarnings("unchecked")
    public void save(List<RowNumberWrapper<PhoneTagAdd>> records, ImportsContext importsContext) {
        log.info("保存已检查的记录共[{}]条", records.size());
        importsContext.getImportsResult().getSavedRecords().addAll(records);
        for (RowNumberWrapper<PhoneTagAdd> record : records) {
            save(record, importsContext);
        }
    }

    @SuppressWarnings("unchecked")
    public void save(RowNumberWrapper<PhoneTagAdd> wrapper, ImportsContext importsContext) {
        phoneTagService.add(wrapper.getRow())
                .subscribeOn(Schedulers.elastic())
                .subscribe();
    }

}
