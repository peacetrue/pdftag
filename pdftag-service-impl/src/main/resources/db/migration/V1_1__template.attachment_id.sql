drop table if exists attachment;
create table attachment
(
    id           bigint auto_increment
        primary key,
    name         varchar(255)  not null comment '名称',
    path         varchar(1022) not null comment '路径',
    sizes        bigint        not null comment '大小（字节）',
    state_id     tinyint       not null comment '状态编码. 1、临时，2、生效、3、删除',
    remark       varchar(255)  null comment '备注',
    creator_id   bigint        not null comment '创建者主键',
    created_time datetime      not null comment '创建时间'
);


alter table template
    add attachment_id LONG null comment '附件' after content;

