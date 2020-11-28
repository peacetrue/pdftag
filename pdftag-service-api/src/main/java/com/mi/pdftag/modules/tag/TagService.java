package com.mi.pdftag.modules.tag;

import reactor.core.publisher.Mono;

import java.util.Map;

/**
 * @author : xiayx
 * @since : 2020-11-28 04:18
 **/
public interface TagService {

    /** 生成指代版本的 PDF 文件 */
    Mono<String> generatePdf(TagGeneratePdf params);

    /** 生成所有版本的 PDF 文件 */
    Mono<Map<String, String>> generatePdfAllVersion(TagGeneratePdf params);

}
