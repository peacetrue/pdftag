package com.mi.pdftag.modules.phonetag;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author xiayx
 */
@Data
public class PhoneTagVO implements Serializable {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    private Long id;
    /** 模版主键 */
    private Long templateId;
    /** 名称 */
    private String name;
    /** 认证型号 */
    private String modelCode;
    /** 包装内容 */
    private String packageContent;
    /** 执行标准 */
    private String standard;
    /** 进网许可标志验证网址 */
    private String networkPermissionUrl;
    /** 进网许可证 */
    private String networkLicense;
    /** 内存大小，单位 G，支持保留1位小数 */
    private BigDecimal memorySize;
    /** 硬盘大小，单位 G，支持保留1位小数 */
    private BigDecimal diskSize;
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
