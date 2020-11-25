DROP TABLE IF EXISTS `user`;
create table user
(
    id            bigint primary key auto_increment comment '主键',
    username      varchar(32)  not null comment '用户名',
    password      varchar(255) not null comment '密码',
    creator_id    bigint       not null comment '创建者主键',
    created_time  datetime     not null comment '创建时间',
    modifier_id   bigint       not null comment '修改者主键',
    modified_time timestamp    not null comment '最近修改时间',
    constraint username unique (username)
);

INSERT INTO user (id, username, password, creator_id, created_time, modifier_id, modified_time)
VALUES (1, 'admin', '{noop}admin', 1, '2020-11-22 02:29:13', 1, '2020-11-23 08:25:01');

DROP TABLE IF EXISTS `template`;
CREATE TABLE `template`
(
    id            BIGINT AUTO_INCREMENT,
    code          VARCHAR(32)    NOT NULL COMMENT '编号',
    type_code     VARCHAR(16)    NOT NULL COMMENT '类型. 1、phone，不同的模版类型对应标签的字段不同',
    name          VARCHAR(32)    NOT NULL COMMENT '名称',
    content       VARCHAR(10240) NOT NULL COMMENT '内容',
    remark        VARCHAR(255)   NOT NULL COMMENT '备注',
    creator_id    BIGINT         NOT NULL COMMENT '创建者主键',
    created_time  DATETIME       NOT NULL COMMENT '创建时间',
    modifier_id   BIGINT         NOT NULL COMMENT '修改者主键',
    modified_time DATETIME       NOT NULL COMMENT '修改时间',
    primary key (id)
);

COMMENT ON TABLE `template` IS '模版';
COMMENT ON COLUMN `template`.id IS '主键';

DROP TABLE IF EXISTS `phone_tag`;
CREATE TABLE `phone_tag`
(
    id              BIGINT AUTO_INCREMENT,
    style_code      VARCHAR(16)  NOT NULL COMMENT '样式',
    template_id     BIGINT       NOT NULL COMMENT '模版. 关联模版主键',
    goods_name      VARCHAR(32)  NOT NULL COMMENT '商品名称',
    model_code      VARCHAR(32)  NOT NULL COMMENT '认证型号',
    package_content VARCHAR(255) NOT NULL COMMENT '包装内含',
    standard        VARCHAR(255) NOT NULL COMMENT '执行标准',
#     network_permission_url VARCHAR(255)  NOT NULL COMMENT '进网许可标志验证网址',
#     manufacturer VARCHAR(255)  NOT NULL COMMENT '制造商',
#     manufacturer_address VARCHAR(255)  NOT NULL COMMENT '制造商地址',
    cmiit_id        VARCHAR(255) NOT NULL COMMENT 'CMIIT ID',
    network_license VARCHAR(255) NOT NULL COMMENT '进网许可证',
    product_name    VARCHAR(255) NOT NULL COMMENT '产品名称',
    colour          VARCHAR(255) NOT NULL COMMENT '颜色',
    storage         VARCHAR(255) NOT NULL COMMENT '存储空间',
#     memory_size     decimal(5, 1) NOT NULL COMMENT '存储空间',
#     disk_size       decimal(5, 1) NOT NULL COMMENT '硬盘大小. 单位 G，支持保留1位小数',
    remark          VARCHAR(255) NOT NULL COMMENT '备注',
    creator_id      BIGINT       NOT NULL COMMENT '创建者主键',
    created_time    DATETIME     NOT NULL COMMENT '创建时间',
    modifier_id     BIGINT       NOT NULL COMMENT '修改者主键',
    modified_time   DATETIME     NOT NULL COMMENT '修改时间',
    primary key (id)
);

COMMENT ON TABLE `phone_tag` IS '标签';
COMMENT ON COLUMN `phone_tag`.id IS '主键';


