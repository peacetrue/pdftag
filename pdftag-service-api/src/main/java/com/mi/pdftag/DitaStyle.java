package com.mi.pdftag;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum DitaStyle implements IdCapable<String>, NameCapable {

    DEFAULT("default", "默认样式"),
    CHINESE("chinese", "中文样式"),
    ENGLISH("english", "英文样式"),
    ;

    private final String id;
    private final String name;

    DitaStyle(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
