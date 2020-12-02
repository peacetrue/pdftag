package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum PhoneTagState implements IdCapable<Integer>, NameCapable {

    DRAFT(1, "草稿"),
    NORMAL(2, "正式"),
    ;

    private final Integer id;
    private final String name;

    PhoneTagState(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
