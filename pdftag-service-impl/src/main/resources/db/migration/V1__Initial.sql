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

create table dictionary_type
(
    id            bigint auto_increment primary key comment '主键',
    code          varchar(32)  not null comment '编码',
    name          varchar(32)  not null comment '名称',
    remark        varchar(255) not null comment '备注',
    creator_id    bigint       not null comment '创建者主键',
    created_time  datetime     not null comment '创建时间',
    modifier_id   bigint       not null comment '修改者主键',
    modified_time datetime     not null comment '最近修改时间',
    constraint dictionary_type_code_uindex unique (code)
) comment '字典类型';

create index dictionary_type_name_index on dictionary_type (name);

create table dictionary_value
(
    id                   bigint auto_increment primary key comment '主键',
    dictionary_type_id   bigint       not null comment '字典类型. 主键',
    dictionary_type_code varchar(32)  not null comment '字典类型. 冗余编码方便查询',
    code                 varchar(32)  not null comment '编码',
    name                 varchar(255) not null comment '名称',
    remark               varchar(255) not null comment '备注',
    creator_id           bigint       not null comment '创建者主键',
    created_time         datetime     not null comment '创建时间',
    modifier_id          bigint       not null comment '修改者主键',
    modified_time        datetime     not null comment '最近修改时间',
    constraint dictionary_value_dictionary_type_id_code_uindex unique (dictionary_type_id, code)
) comment '字典项值';

create index dictionary_value_dictionary_type_code_index on dictionary_value (dictionary_type_code);

create table phone_tag
(
    id                bigint auto_increment primary key comment '主键',
    style_code        varchar(32)  not null comment '样式',
    template_id       bigint       not null comment '模版. 关联模版主键',
    goods_name        varchar(32)  not null comment '商品名称',
    model_code        varchar(32)  not null comment '认证型号',
    package_content   varchar(32)  not null comment '包装内含',
    standard          varchar(32)  not null comment '执行标准',
    cmiit_id          varchar(32)  not null comment 'CMIIT ID',
    network_license   varchar(32)  not null comment '进网许可证',
    product_name      varchar(32)  not null comment '产品名称',
    colour            varchar(32)  not null comment '颜色',
    storage           varchar(32)  not null comment '存储空间',
    remark            varchar(255) not null comment '备注',
    reproduction_path varchar(255) not null comment '演示附件',
    production_path   varchar(255) not null comment '正式附件',
    creator_id        bigint       not null comment '创建者主键',
    created_time      datetime     not null comment '创建时间',
    modifier_id       bigint       not null comment '修改者主键',
    modified_time     datetime     not null comment '修改时间'
) comment '手机标签';

create index phone_tag_goods_name_index on phone_tag (goods_name);

create index phone_tag_product_name_index on phone_tag (product_name);

create table template
(
    id            bigint auto_increment primary key comment '主键',
    code          varchar(32)  not null comment '编号',
    type_code     varchar(32)  not null comment '类型. 1、phone，不同的模版类型对应标签的字段不同',
    name          varchar(32)  not null comment '名称',
    content       varchar(255) not null comment '内容',
    attachment_id bigint       not null comment '附件',
    remark        varchar(255) not null comment '备注',
    creator_id    bigint       not null comment '创建者主键',
    created_time  datetime     not null comment '创建时间',
    modifier_id   bigint       not null comment '修改者主键',
    modified_time datetime     not null comment '修改时间',
    constraint template_code_uindex unique (code)
);

create index template_name_index on template (name);

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
);

INSERT INTO user (id, username, password, creator_id, created_time, modifier_id, modified_time)
VALUES (1, 'admin', '{noop}admin', 1, '2020-11-22 02:29:13', 1, '2020-11-23 08:25:01');
INSERT INTO user (username, password, creator_id, created_time, modifier_id, modified_time)
VALUES ('peacetrue', '{noop}peacetrue', 1, current_timestamp, 1, current_timestamp);
