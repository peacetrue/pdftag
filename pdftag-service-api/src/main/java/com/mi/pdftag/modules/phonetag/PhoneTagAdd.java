package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.OperatorCapableImpl;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
public class PhoneTagAdd extends OperatorCapableImpl<Long> {

    private static final long serialVersionUID = 0L;

    /** 模版主键 */
    @NotNull
    private Long templateId;
    /** 名称 */
    @NotNull
    @Size(min = 1, max = 32)
    private String name;
    /** 认证型号 */
    @NotNull
    @Size(min = 1, max = 32)
    private String modelCode;
    /** 包装内容 */
    @NotNull
    @Size(min = 1, max = 255)
    private String packageContent;
    /** 执行标准 */
    @NotNull
    @Size(min = 1, max = 255)
    private String standard;
    /** 进网许可标志验证网址 */
    @NotNull
    @Size(min = 1, max = 255)
    private String networkPermissionUrl;
    /** 进网许可证 */
    @NotNull
    @Size(min = 1, max = 255)
    private String networkLicense;
    /** 内存大小，单位 G，支持保留1位小数 */
    @NotNull
    private BigDecimal memorySize;
    /** 硬盘大小，单位 G，支持保留1位小数 */
    @NotNull
    private BigDecimal diskSize;
    /** 备注 */
    @NotNull
    @Size(min = 1, max = 255)
    private String remark;

}
