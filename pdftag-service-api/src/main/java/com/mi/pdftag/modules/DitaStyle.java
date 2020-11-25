package com.mi.pdftag.modules;

import com.github.peacetrue.core.CodeCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum DitaStyle implements CodeCapable, NameCapable {

    DEFAULT("default", "默认样式"),
    CHINESE("chinese", "中文样式"),
    ENGLISH("english", "英文样式"),
    ;

    private String code;
    private String name;

    DitaStyle(String code, String name) {
        this.code = code;
        this.name = name;
    }
}
