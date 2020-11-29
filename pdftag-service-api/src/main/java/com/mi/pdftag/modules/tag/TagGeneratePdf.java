package com.mi.pdftag.modules.tag;

import com.github.peacetrue.core.OperatorCapableImpl;
import lombok.*;

import javax.validation.constraints.NotNull;

/**
 * @author : xiayx
 * @since : 2020-11-28 04:18
 **/
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class TagGeneratePdf extends OperatorCapableImpl<Long> implements Cloneable {

    private String versionType;
    @NotNull
    private Tag tag;


}
