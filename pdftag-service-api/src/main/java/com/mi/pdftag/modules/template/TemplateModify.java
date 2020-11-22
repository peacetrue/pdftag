package com.mi.pdftag.modules.template;

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
public class TemplateModify extends OperatorCapableImpl<Long> {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    @NotNull
    private Long id;
    /** 编号 */
    @NotNull
    @Size(min = 1, max = 32)
    private String code;
    /** 类型：1、phone，不同的模版类型对应标签的字段不同 */
    @NotNull
    private Integer typeId;
    /** 名称 */
    @NotNull
    @Size(min = 1, max = 32)
    private String name;
    /** 内容 */
    @NotNull
    @Size(min = 1, max = 1023)
    private String content;
    /** 备注 */
    @NotNull
    @Size(min = 1, max = 255)
    private String remark;

}
