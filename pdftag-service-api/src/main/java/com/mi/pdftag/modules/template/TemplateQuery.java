package com.mi.pdftag.modules.template;

import com.github.peacetrue.core.OperatorCapableImpl;
import com.github.peacetrue.core.Range;
import lombok.*;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TemplateQuery extends OperatorCapableImpl<Long> {

    public static final TemplateQuery DEFAULT = new TemplateQuery();

    private static final long serialVersionUID = 0L;

    /** 主键 */
    private Long[] id;
    /** 编号 */
    private String code;
    /** 类型. 1、phone，不同的模版类型对应标签的字段不同 */
    private String typeCode;
    /** 名称 */
    private String name;
    /** 内容 */
    private String content;
    /** 备注 */
    private String remark;
    /** 创建者主键 */
    private Long creatorId;
    /** 创建时间 */
    private Range.LocalDateTime createdTime;
    /** 修改者主键 */
    private Long modifierId;
    /** 修改时间 */
    private Range.LocalDateTime modifiedTime;

    public TemplateQuery(Long[] id) {
        this.id = id;
    }

}
