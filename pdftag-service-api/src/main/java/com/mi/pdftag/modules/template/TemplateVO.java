package com.mi.pdftag.modules.template;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author xiayx
 */
@Data
public class TemplateVO implements Serializable {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    private Long id;
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
    private LocalDateTime createdTime;
    /** 修改者主键 */
    private Long modifierId;
    /** 修改时间 */
    private LocalDateTime modifiedTime;
}
