package com.mi.pdftag;

import com.github.peacetrue.core.CodeCapable;
import com.github.peacetrue.core.NameCapable;
import lombok.Getter;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum VersionType implements CodeCapable, NameCapable {

    REPRODUCTION("reproduction", "演示"),
    PRODUCTION("production", "正式"),
    ;

    private String code;
    private String name;

    VersionType(String code, String name) {
        this.code = code;
        this.name = name;
    }
}
