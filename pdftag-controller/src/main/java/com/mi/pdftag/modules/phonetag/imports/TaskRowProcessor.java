package com.mi.pdftag.modules.phonetag.imports;

import com.github.peacetrue.imports.ImportsContext;
import com.github.peacetrue.imports.ImportsRowProcessor;
import com.github.peacetrue.imports.RowNumberWrapper;
import com.github.peacetrue.imports.supports.RowNumberWrapperImpl;
import com.mi.pdftag.modules.phonetag.PhoneTagAdd;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TaskRowProcessor implements ImportsRowProcessor<String> {

    @Override
    @SuppressWarnings("unchecked")
    public void processRow(RowNumberWrapper<String[]> rows, ImportsContext importsContext) {
        importsContext.getImportsResult().getOriginalRecords().add(rows.getRow());

        PhoneTagAdd vo = new PhoneTagAdd();
        vo.setStyleCode(rows.getRow()[0]);
        vo.setTemplateId(Long.parseLong(rows.getRow()[1]));
        vo.setGoodsName(rows.getRow()[2]);
        vo.setModelCode(rows.getRow()[2]);
        vo.setPackageContent(rows.getRow()[2]);
        vo.setStandard(rows.getRow()[2]);
        vo.setCmiitId(rows.getRow()[2]);
        vo.setNetworkLicense(rows.getRow()[2]);
        vo.setProductName(rows.getRow()[2]);
        vo.setColour(rows.getRow()[2]);
        vo.setStorage(rows.getRow()[2]);
        importsContext.getImportsResult().getParsedRecords().add(new RowNumberWrapperImpl<>(rows.getRowNumber(), vo));
    }

}
