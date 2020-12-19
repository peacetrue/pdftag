package com.mi.pdftag.modules.phonetag.imports;

import com.github.peacetrue.imports.ImportsContext;
import com.github.peacetrue.imports.ImportsRowProcessor;
import com.github.peacetrue.imports.RowNumberWrapper;
import com.github.peacetrue.imports.supports.RowNumberWrapperImpl;
import com.mi.pdftag.modules.phonetag.PhoneTagAdd;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVRecord;

import java.time.LocalDate;

@Slf4j
public class TaskRowProcessor implements ImportsRowProcessor<String> {

    @Override
    @SuppressWarnings("unchecked")
    public void processRow(RowNumberWrapper<String[]> rows, ImportsContext importsContext) {
        importsContext.getImportsResult().getOriginalRecords().add(rows.getRow());

        if (!(rows instanceof CSVRecordRowNumberWrapper)) return;
        CSVRecord record = ((CSVRecordRowNumberWrapper) rows).getRecord();
        //
        //"标签种类", "商品名称", "认证型号", "包装内含", "执行标准", "CMIIT ID", "进网许可证", "产品名称", "颜色", "存储空间", "生产日期", "商标", "制造商", "制造商地址"
        PhoneTagAdd vo = new PhoneTagAdd();
        vo.setTemplateId(Long.parseLong(record.get("标签种类")));
        vo.setGoodsName(record.get("商品名称"));
        vo.setModelCode(record.get("认证型号"));
        vo.setPackageContent(record.get("包装内含"));
        vo.setStandard(record.get("执行标准"));
        vo.setCmiitId(record.get("CMIIT ID"));
        vo.setNetworkLicense(record.get("进网许可证"));
        vo.setProductName(record.get("产品名称"));
        vo.setColour(record.get("颜色"));
        vo.setStorage(record.get("存储空间"));
        vo.setProductDate(LocalDate.parse(record.get("生产日期")));
        vo.setBrand(record.get("商标"));
        vo.setManufacturer(record.get("制造商"));
        vo.setManufacturerAddress(record.get("制造商地址"));
        importsContext.getImportsResult().getParsedRecords().add(new RowNumberWrapperImpl<>(rows.getRowNumber(), vo));
    }

}
