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
//1.4 同步修改预览页的提示文字
//    1.6 新建标签页或编辑标签页，通过点击左侧菜单等操作改变页面，默认做“保存草稿”处理
    DRAFT(1, "草稿", VersionType.REPRODUCTION),
    NORMAL(2, "模板", VersionType.PRODUCTION),
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
