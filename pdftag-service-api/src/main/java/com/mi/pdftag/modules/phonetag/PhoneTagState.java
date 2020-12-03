package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.NameCapable;
import com.github.peacetrue.util.StructureUtils;
import com.mi.pdftag.VersionType;
import lombok.Getter;

import java.util.Arrays;

/**
 * @author : xiayx
 * @since : 2020-11-24 13:53
 **/
@Getter
public enum PhoneTagState implements IdCapable<Integer>, NameCapable {

    DRAFT(1, "草稿", VersionType.REPRODUCTION),
    NORMAL(2, "发布", VersionType.PRODUCTION),
    ;

    private final Integer id;
    private final String name;
    private final VersionType versionType;

    PhoneTagState(Integer id, String name, VersionType versionType) {
        this.id = id;
        this.name = name;
        this.versionType = versionType;
    }

    public static PhoneTagState findById(Integer id) {
        return StructureUtils
                .findOptionalById(Arrays.stream(PhoneTagState.values()), id)
                .orElseThrow(() -> new IllegalArgumentException(String.format("id[%s] invalid for PhoneTagState", id)));
    }

}
