alter table phone_tag
    add reproduction_path varchar(255) null comment '演示附件' after remark;

alter table phone_tag
    add production_path varchar(255) null comment '正式附件' after reproduction_path;

