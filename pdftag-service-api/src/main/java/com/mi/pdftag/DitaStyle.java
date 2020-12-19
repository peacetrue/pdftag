package com.mi.pdftag;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum DitaStyle implements IdCapable<Integer>, NameCapable {

    DEFAULT(1, "默认样式"),
    CHINESE(2, "中文礼盒背贴（大陆版）"),
    ENGLISH(3, "英文礼盒背贴（分销版）"),
    ;

    private final Integer id;
    private final String name;

    DitaStyle(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
