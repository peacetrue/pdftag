package com.mi.pdftag.modules.template;

import com.github.peacetrue.core.CodeCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum TemplateType implements CodeCapable, NameCapable {

    PHONE("phone", "手机"),
    ;

    private final String code;
    private final String name;

    TemplateType(String code, String name) {
        this.code = code;
        this.name = name;
    }
}
