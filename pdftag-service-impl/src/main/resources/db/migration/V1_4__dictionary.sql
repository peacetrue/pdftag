drop table if exists dictionary_type;
create table dictionary_type
(
    id            bigint primary key auto_increment comment '主键',
    code          varchar(32)  not null comment '编码',
    name          varchar(32)  not null comment '名称',
    remark        varchar(255) not null comment '备注',
    creator_id    bigint       not null comment '创建者主键',
    created_time  datetime     not null comment '创建时间',
    modifier_id   bigint       not null comment '修改者主键',
    modified_time datetime     not null comment '最近修改时间'
) comment '字典类型';

create unique index dictionary_type_code
    on dictionary_type (code);

drop table if exists dictionary_value;
create table dictionary_value
(
    id                   bigint primary key auto_increment comment '主键',
    dictionary_type_id   bigint       not null comment '字典类型. 主键',
    dictionary_type_code varchar(32)  not null comment '字典类型. 冗余编码方便查询',
    code                 varchar(32)  not null comment '编码',
    name                 varchar(255) not null comment '名称',
    remark               varchar(255) not null comment '备注',
    creator_id           bigint       not null comment '创建者主键',
    created_time         datetime     not null comment '创建时间',
    modifier_id          bigint       not null comment '修改者主键',
    modified_time        datetime     not null comment '最近修改时间'
) comment '字典项值';

create unique index dictionary_value_code
    on dictionary_value (dictionary_type_id, code);

insert into dictionary_type (code, name, remark, creator_id, created_time, modifier_id, modified_time)
values ('ditaStyle', 'dita样式', '', 1, current_timestamp, 1, current_timestamp);

insert into dictionary_value (dictionary_type_id, dictionary_type_code, code, name, remark, creator_id, created_time,
                              modifier_id, modified_time)
values ((select id from dictionary_type where code = 'ditaStyle'), 'ditaStyle', 'default', '默认', '', 1,
        current_timestamp, 1, current_timestamp);

insert into dictionary_value (dictionary_type_id, dictionary_type_code, code, name, remark, creator_id, created_time,
                              modifier_id, modified_time)
values ((select id from dictionary_type where code = 'ditaStyle'), 'ditaStyle', 'chinese', '中文', '', 1,
        current_timestamp, 1, current_timestamp);

insert into dictionary_value (dictionary_type_id, dictionary_type_code, code, name, remark, creator_id, created_time,
                              modifier_id, modified_time)
values ((select id from dictionary_type where code = 'ditaStyle'), 'ditaStyle', 'english', '英文', '', 1,
        current_timestamp, 1, current_timestamp);
