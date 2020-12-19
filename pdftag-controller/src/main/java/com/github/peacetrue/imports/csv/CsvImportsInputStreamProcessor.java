//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.github.peacetrue.imports.csv;

import com.github.peacetrue.imports.ImportsContext;
import com.github.peacetrue.imports.ImportsInputStreamProcessor;
import com.github.peacetrue.imports.ImportsRowProcessor;
import com.mi.pdftag.modules.phonetag.imports.CSVRecordRowNumberWrapper;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class CsvImportsInputStreamProcessor implements ImportsInputStreamProcessor {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private ImportsRowProcessor<String> importsRowProcessor;

    public CsvImportsInputStreamProcessor(ImportsRowProcessor<String> importsRowProcessor) {
        this.importsRowProcessor = importsRowProcessor;
    }

    public void processInputStream(InputStream inputStream, ImportsContext importsContext) throws IOException {
        CsvImportsSetting setting = (CsvImportsSetting) importsContext.getImportsSetting();
        InputStreamReader streamReader = new InputStreamReader(inputStream, setting.getCharset());
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.withHeader(setting.getHeader()).withSkipHeaderRecord().parse(streamReader);
        for (CSVRecord record : records) {
            if (record.getRecordNumber() == setting.getMaxRowCount()) {
                logger.debug("到达允许的最大行数[{}]，处理完成", setting.getMaxRowCount());
                return;
            }
            importsRowProcessor.processRow(new CSVRecordRowNumberWrapper(record), importsContext);
        }
    }

    private static final byte[] BOM = {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF};

    public static String toBOM(String string) {
        byte[] bytes = string.getBytes(StandardCharsets.UTF_8);
        byte[] bomBytes = new byte[3 + bytes.length];
        System.arraycopy(BOM, 0, bomBytes, 0, BOM.length);
        System.arraycopy(bytes, 0, bomBytes, 3, bytes.length);
        return new String(bomBytes, StandardCharsets.UTF_8);
    }

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    public void setImportsRowProcessor(ImportsRowProcessor<String> importsRowProcessor) {
        this.importsRowProcessor = importsRowProcessor;
    }

    public Logger getLogger() {
        return this.logger;
    }

    public ImportsRowProcessor<String> getImportsRowProcessor() {
        return this.importsRowProcessor;
    }
}
