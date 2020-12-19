package com.mi.pdftag.modules.template;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum TemplateType implements IdCapable<Integer>, NameCapable {

    PHONE(1, "手机"),
    ;

    private final Integer id;
    private final String name;

    TemplateType(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
