package com.mi.pdftag.modules.phonetag;

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
public class PhoneTagModify extends OperatorCapableImpl<Long> {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    @NotNull
    private Long id;
    /** 样式编码 */
    @NotNull
    @Size(min = 1, max = 32)
    private String styleCode;
    /** 模版主键 */
    @NotNull
    private Long templateId;
    /** 商品名称 */
    @NotNull
    @Size(min = 1, max = 255)
    private String goodsName;
    /** 认证型号 */
    @NotNull
    @Size(min = 1, max = 255)
    private String modelCode;
    /** 包装内含 */
    @NotNull
    @Size(min = 1, max = 255)
    private String packageContent;
    /** 执行标准 */
    @NotNull
    @Size(min = 1, max = 255)
    private String standard;
    /** CMIIT ID */
    @NotNull
    @Size(min = 1, max = 255)
    private String cmiitId;
    /** 进网许可证 */
    @NotNull
    @Size(min = 1, max = 255)
    private String networkLicense;
    /** 产品名称 */
    @NotNull
    @Size(min = 1, max = 255)
    private String productName;
    /** 颜色 */
    @NotNull
    @Size(min = 1, max = 255)
    private String colour;
    /** 存储空间 */
    @NotNull
    @Size(min = 1, max = 255)
    private String storage;
    /** 备注 */
    @Size(min = 1, max = 255)
    private String remark;

}
