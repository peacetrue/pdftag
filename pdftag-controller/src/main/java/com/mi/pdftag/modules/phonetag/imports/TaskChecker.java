package com.mi.pdftag.modules.phonetag.imports;

import com.github.peacetrue.imports.ImportsChecker;
import com.github.peacetrue.imports.ImportsContext;
import com.github.peacetrue.imports.ImportsResult;
import com.github.peacetrue.imports.RowNumberWrapper;
import com.mi.pdftag.modules.phonetag.PhoneTagAdd;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
 * @author xiayx
 */
@Slf4j
public class TaskChecker implements ImportsChecker<PhoneTagAdd> {

    @Override
    @SuppressWarnings("unchecked")
    public void check(List<RowNumberWrapper<PhoneTagAdd>> records, ImportsContext importsContext) {
        log.info("检查已解析的数据共[{}]条", records.size());

        if (records.isEmpty()) return;

        ImportsResult<PhoneTagAdd> importsResult = importsContext.getImportsResult();
        importsResult.getCheckedRecords().addAll(records);
    }
}
