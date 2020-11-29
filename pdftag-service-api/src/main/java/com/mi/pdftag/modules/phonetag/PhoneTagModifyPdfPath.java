package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.IdCapable;
import com.github.peacetrue.core.OperatorCapableImpl;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PhoneTagModifyPdfPath extends OperatorCapableImpl<Long> implements IdCapable<Long> {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    @NotNull
    private Long id;
    /** 演示附件 */
    @NotNull
    @Size(min = 5, max = 255)
    private String reproductionPath;
    /** 正式附件 */
    @Size(min = 5, max = 255)
    private String productionPath;

}
