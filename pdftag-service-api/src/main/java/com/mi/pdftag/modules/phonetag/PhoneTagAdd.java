package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.OperatorCapableImpl;
import com.mi.pdftag.modules.tag.Tag;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
public class PhoneTagAdd extends OperatorCapableImpl<Long> implements Tag {

    private static final long serialVersionUID = 0L;

    /** 模版主键 */
    @NotNull
    private Long templateId;
    /** 样式编码 */
    private String styleCode;
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
    /** 商标 */
    @NotNull
    @Size(min = 1, max = 255)
    private String brand;
    /** 生产日期 */
    @NotNull
    private LocalDate productDate;
    /** 进网许可标志验证网址 */
    @Size(min = 1, max = 255)
    private String networkPermissionUrl = "jwxk.miit.gov.cn";
    /** 制造商 */
    @Size(min = 1, max = 255)
    private String manufacturer = "小米通讯技术有限公司";
    /** 制造商地址 */
    @Size(min = 1, max = 255)
    private String manufacturerAddress = "北京市海淀区西二旗中路33号院6号楼9层019号";
    /** 状态 {@link PhoneTagState} */
    private Integer stateId;
    /** 备注 */
    @Size(min = 1, max = 255)
    private String remark;
}
