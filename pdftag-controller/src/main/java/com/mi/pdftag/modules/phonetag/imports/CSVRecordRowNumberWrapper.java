package com.mi.pdftag.modules.phonetag.imports;

import com.github.peacetrue.imports.RowNumberWrapper;
import com.github.peacetrue.spring.util.BeanUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.csv.CSVRecord;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CSVRecordRowNumberWrapper implements RowNumberWrapper<String[]> {

    private CSVRecord record;

    @Override
    public Integer getRowNumber() {
        return (int) record.getRecordNumber();
    }

    @Override
    public String[] getRow() {
        return (String[]) BeanUtils.getPropertyValue(record, "values");
    }
}
