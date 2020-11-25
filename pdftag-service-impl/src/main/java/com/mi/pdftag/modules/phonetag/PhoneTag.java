package com.mi.pdftag.modules.phonetag;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 标签实体类
 *
 * @author xiayx
 */
@Getter
@Setter
@ToString
public class PhoneTag implements Serializable {

    private static final long serialVersionUID = 0L;

    /** 主键 */
    @Id
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
    /** CMIIT ID */
    private String cmiitId;
//    /** 进网许可标志验证网址 */
//    private String networkPermissionUrl;
//    /** 制造商 */
//    private String manufacturer;
//    /** 制造商地址 */
//    private String manufacturerAddress;
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
