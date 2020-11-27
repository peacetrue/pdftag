package com.github.peacetrue.dita;

import reactor.core.publisher.Mono;

import java.util.Map;

/**
 * @author : xiayx
 * @since : 2020-11-27 02:14
 **/
public interface DitaService {

    /** 执行 dita 命令，返回生成文件位置 */
    Mono<String> execute(String ditaBaseDir,String templateFolder, Map<String,Object> params);

}
