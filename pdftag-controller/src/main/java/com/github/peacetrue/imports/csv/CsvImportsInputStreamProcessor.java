//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.github.peacetrue.imports.csv;

import com.github.peacetrue.imports.ImportsContext;
import com.github.peacetrue.imports.ImportsException;
import com.github.peacetrue.imports.ImportsInputStreamProcessor;
import com.github.peacetrue.imports.ImportsRowProcessor;
import com.github.peacetrue.imports.supports.RowNumberWrapperImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class CsvImportsInputStreamProcessor implements ImportsInputStreamProcessor {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private ImportsRowProcessor<String> importsRowProcessor;

    public CsvImportsInputStreamProcessor(ImportsRowProcessor<String> importsRowProcessor) {
        this.importsRowProcessor = importsRowProcessor;
    }

    public void processInputStream(InputStream inputStream, ImportsContext importsContext) throws IOException {
        this.logger.info("解析数据[{}]", inputStream);
        CsvImportsSetting setting = (CsvImportsSetting) importsContext.getImportsSetting();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, setting.getCharset()));
        int lineIndex = -1;

        String line;
        while ((line = reader.readLine()) != null) {
            ++lineIndex;
            if (lineIndex == setting.getMaxRowCount()) {
                this.logger.debug("到达允许的最大行数[{}]，处理完成", setting.getMaxRowCount());
                return;
            }

            this.logger.debug("读取第[{}]行的信息[{}]", lineIndex + 1, line);
            String[] header;
            if (lineIndex == 0) {
                header = line.split(setting.getSeparator());
                for (int i = 0; i < setting.getHeader().length; i++) {
                    String exceptItem = setting.getHeader()[i];
                    String actualItem = header[i];
                    if (!exceptItem.equals(actualItem)) {
                        String bom = toBOM(exceptItem);
                        if (!bom.equals(actualItem)) {
                            throw new ImportsException(String.format("表头 '%s' 错误，期待 '%s'", actualItem, exceptItem));
                        }
                    }
                }
                this.logger.debug("忽略第一行（标题行）");
            } else if (line.trim().equals("")) {
                this.logger.debug("忽略空行");
            } else {
                header = line.split(setting.getSeparator(), setting.getHeader().length);
                this.logger.debug("转换成单元格数组[{}]", Arrays.toString(header));
                this.importsRowProcessor.processRow(new RowNumberWrapperImpl(lineIndex + 1, header), importsContext);
            }
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
