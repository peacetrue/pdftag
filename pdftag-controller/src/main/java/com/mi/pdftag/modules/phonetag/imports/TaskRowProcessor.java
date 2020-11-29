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
//样式,模版,商品名称,认证型号,包装内含,执行标准,CMIIT ID,进网许可证,产品名称,颜色,存储空间
//default,1,5G数字移动电话机,M2001J2C,Type-C 有保护套有转接头,4G常用,2019,00-B324,小米 10,国风雅灰,8GB内存 128GB存储
        PhoneTagAdd vo = new PhoneTagAdd();
        vo.setStyleCode(rows.getRow()[0]);
        vo.setTemplateId(Long.parseLong(rows.getRow()[1]));
        vo.setGoodsName(rows.getRow()[2]);
        vo.setModelCode(rows.getRow()[3]);
        vo.setPackageContent(rows.getRow()[4]);
        vo.setStandard(rows.getRow()[5]);
        vo.setCmiitId(rows.getRow()[6]);
        vo.setNetworkLicense(rows.getRow()[7]);
        vo.setProductName(rows.getRow()[8]);
        vo.setColour(rows.getRow()[9]);
        vo.setStorage(rows.getRow()[10]);
        importsContext.getImportsResult().getParsedRecords().add(new RowNumberWrapperImpl<>(rows.getRowNumber(), vo));
    }

}
