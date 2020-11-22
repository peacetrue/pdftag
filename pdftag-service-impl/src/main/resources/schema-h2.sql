DROP TABLE IF EXISTS `template`;
CREATE TABLE `template`
(
    id            BIGINT AUTO_INCREMENT,
    code          VARCHAR(32)   NOT NULL COMMENT '编号',
    type_id       TINYINT       NOT NULL COMMENT '类型：1、phone，不同的模版类型对应标签的字段不同',
    name          VARCHAR(32)   NOT NULL COMMENT '名称',
    content       VARCHAR(1023) NOT NULL COMMENT '内容',
    remark        VARCHAR(255)  NOT NULL COMMENT '备注',
    creator_id    BIGINT        NOT NULL COMMENT '创建者主键',
    created_time  DATETIME      NOT NULL COMMENT '创建时间',
    modifier_id   BIGINT        NOT NULL COMMENT '修改者主键',
    modified_time DATETIME      NOT NULL COMMENT '修改时间',
    primary key (id)
);

COMMENT ON TABLE `template` IS '模版';
COMMENT ON COLUMN `template`.id IS '主键';

DROP TABLE IF EXISTS `phone_tag`;
CREATE TABLE `phone_tag`
(
    id                     BIGINT AUTO_INCREMENT,
    template_id            BIGINT        NOT NULL COMMENT '模版主键',
    name                   VARCHAR(32)   NOT NULL COMMENT '名称',
    model_code             VARCHAR(32)   NOT NULL COMMENT '认证型号',
    package_content        VARCHAR(255)  NOT NULL COMMENT '包装内容',
    standard               VARCHAR(255)  NOT NULL COMMENT '执行标准',
    network_permission_url VARCHAR(255)  NOT NULL COMMENT '进网许可标志验证网址',
    network_license        VARCHAR(255)  NOT NULL COMMENT '进网许可证',
    memory_size            decimal(5, 1) NOT NULL COMMENT '内存大小，单位 G，支持保留1位小数',
    disk_size              decimal(5, 1) NOT NULL COMMENT '硬盘大小，单位 G，支持保留1位小数',
    remark                 VARCHAR(255)  NOT NULL COMMENT '备注',
    creator_id             BIGINT        NOT NULL COMMENT '创建者主键',
    created_time           DATETIME      NOT NULL COMMENT '创建时间',
    modifier_id            BIGINT        NOT NULL COMMENT '修改者主键',
    modified_time          DATETIME      NOT NULL COMMENT '修改时间',
    primary key (id)
);

COMMENT ON TABLE `phone_tag` IS '标签';
COMMENT ON COLUMN `phone_tag`.id IS '主键';
