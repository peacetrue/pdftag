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
    /** 样式编码 */
    private String styleCode;
    /** 模版主键 */
    private Long templateId;
    /** 商品名称 */
    private String goodsName;
    /** 认证型号 */
    private String modelCode;
    /** 包装内含 */
    private String packageContent;
    /** 执行标准 */
    private String standard;
    /** 进网许可标志验证网址 */
    private String networkPermissionUrl = "jwxk.miit.gov.cn";
    /** 制造商 */
    private String manufacturer = "小米通讯技术有限公司";
    /** 制造商地址 */
    private String manufacturerAddress = "北京市海淀区西二旗中路33号院6号楼9层019号";
    /** CMIIT ID */
    private String cmiitId;
    /** 进网许可证 */
    private String networkLicense;
    /** 产品名称 */
    private String productName;
    /** 颜色 */
    private String colour;
    /** 存储空间 */
    private String storage;
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
