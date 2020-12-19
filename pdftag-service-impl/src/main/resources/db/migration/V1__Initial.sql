drop table if exists user;
create table user
(
    id            bigint auto_increment primary key comment '主键',
    username      varchar(32)  not null comment '用户名',
    password      varchar(255) not null comment '密码',
    creator_id    bigint       not null comment '创建者主键',
    created_time  datetime     not null comment '创建时间',
    modifier_id   bigint       not null comment '修改者主键',
    modified_time timestamp    not null comment '最近修改时间',
    constraint unique_username unique (username)
) comment '用户';

INSERT INTO user (id, username, password, creator_id, created_time, modifier_id, modified_time)
VALUES (1, 'admin', '{noop}admin', 1, '2020-11-22 02:29:13', 1, '2020-11-23 08:25:01');

drop table if exists attachment;
create table attachment
(
    id           bigint auto_increment primary key comment '主键',
    name         varchar(32)  not null comment '名称',
    path         varchar(255) not null comment '路径',
    sizes        bigint       not null comment '大小（字节）',
    state_id     tinyint      not null comment '状态编码. 1、临时，2、生效、3、删除',
    remark       varchar(255) not null comment '备注',
    creator_id   bigint       not null comment '创建者主键',
    created_time datetime     not null comment '创建时间'
) comment '附件';

create index attachment_name_index on attachment (name);
create index attachment_state_id_index on attachment (state_id);

insert into attachment (id, name, path, sizes, state_id, remark, creator_id, created_time)
values (1, '礼盒标签中文模版', 'giftBoxLabel/chinese', 0, 2, '', 1, current_timestamp);

insert into attachment (id, name, path, sizes, state_id, remark, creator_id, created_time)
values (2, '礼盒标签英文模版', 'giftBoxLabel/english', 0, 2, '', 1, current_timestamp);

drop table if exists template;
create table template
(
    id            bigint auto_increment primary key comment '主键',
    code          varchar(32)  not null comment '编号',
    style_id      tinyint      not null comment '样式',
    style_code    varchar(32)  not null comment '样式编码',
    type_code     varchar(32)  not null comment '类型. 1、phone，不同的模版类型对应标签的字段不同',
    name          varchar(32)  not null comment '名称',
    content       varchar(255) not null comment '内容',
    attachment_id bigint       not null comment '附件',
    remark        varchar(255) not null comment '备注',
    creator_id    bigint       not null comment '创建者主键',
    created_time  datetime     not null comment '创建时间',
    modifier_id   bigint       not null comment '修改者主键',
    modified_time datetime     not null comment '修改时间'
);

create unique index template_code_uindex on template (code);
create index template_style_id_index on template (style_id);
create index template_style_code_index on template (style_code);

insert into template (id, code, style_id, style_code, type_code, name, content, attachment_id, remark, creator_id,
                      created_time, modifier_id, modified_time)
values (1, 'giftBoxLabel_chinese', 2, 'CHINESE', 'giftBoxLabel', '中文礼盒标签', '', 1, '', 1, current_timestamp, 1,
        current_timestamp);

insert into template (id, code, style_id, style_code, type_code, name, content, attachment_id, remark, creator_id,
                      created_time, modifier_id, modified_time)
values (2, 'giftBoxLabel_english', 3, 'ENGLISH', 'giftBoxLabel', '英文礼盒标签', '', 2, '', 1, current_timestamp, 1,
        current_timestamp);

drop table if exists phone_tag;
create table phone_tag
(
    id                     bigint auto_increment primary key comment '主键',
    template_id            bigint       not null comment '模版. 关联模版主键',
    style_code             varchar(32)  not null comment '样式',
    product_name           varchar(32)  not null comment '产品名称',
    goods_name             varchar(32)  not null comment '商品名称',
    model_code             varchar(32)  not null comment '认证型号',
    package_content        varchar(255) not null comment '包装内含',
    standard               varchar(255) not null comment '执行标准',
    cmiit_id               varchar(32)  not null comment 'CMIIT ID',
    network_license        varchar(32)  not null comment '进网许可证',
    network_permission_url varchar(255)  not null comment '进网许可标志验证网址',
    manufacturer           varchar(255)  not null comment '制造商',
    manufacturer_address   varchar(255)  not null comment '制造商地址',
    colour                 varchar(32)  not null comment '颜色',
    storage                varchar(32)  not null comment '存储空间',
    brand                  varchar(32)  not null comment '商标',
    product_date           date         not null comment '生产日期',
    remark                 varchar(255) not null comment '备注',
    reproduction_path      varchar(255) not null comment '演示附件',
    production_path        varchar(255) not null comment '正式附件',
    state_id               tinyint      not null comment '状态. 1：草稿、2：发布',
    creator_id             bigint       not null comment '创建者主键',
    created_time           datetime     not null comment '创建时间',
    modifier_id            bigint       not null comment '修改者主键',
    modified_time          datetime     not null comment '修改时间'
) comment '礼盒标签';

create index phone_tag_goods_name_index on phone_tag (goods_name);
create index phone_tag_product_name_index on phone_tag (product_name);


drop table if exists dictionary_type;
drop table if exists dictionary_value;

