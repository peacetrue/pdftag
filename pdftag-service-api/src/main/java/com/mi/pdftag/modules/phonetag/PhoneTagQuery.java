package com.mi.pdftag.modules.phonetag;

import com.github.peacetrue.core.OperatorCapableImpl;
import com.github.peacetrue.core.Range;
import lombok.*;

import java.math.BigDecimal;


/**
 * @author xiayx
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PhoneTagQuery extends OperatorCapableImpl<Long> {

    public static final PhoneTagQuery DEFAULT = new PhoneTagQuery();

    private static final long serialVersionUID = 0L;

    /** 主键 */
    private Long[] id;
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
    private Range.LocalDateTime createdTime;
    /** 修改者主键 */
    private Long modifierId;
    /** 修改时间 */
    private Range.LocalDateTime modifiedTime;

    public PhoneTagQuery(Long[] id) {
        this.id = id;
    }

}
