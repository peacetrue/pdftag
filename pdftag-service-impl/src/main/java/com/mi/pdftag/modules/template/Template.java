package com.mi.pdftag.modules.template;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 模版实体类
 *
 * @author xiayx
 */
@Getter
@Setter
@ToString
public class Template implements Serializable {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    @Id
    private Long id;
    /** 编号 */
    private String code;
    /** 样式 */
    private Integer styleId;
    /** 样式编号 */
    private String styleCode;
    /** 类型. 1、phone，不同的模版类型对应标签的字段不同 */
    private String typeCode;
    /** 名称 */
    private String name;
    /** 内容 */
    private String content;
    /** 附件 */
    private Long attachmentId;
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
