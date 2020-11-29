truncate table attachment;
truncate table template;
truncate table phone_tag;

create unique index unique_template_code
    on template (code);

alter table template
    modify attachment_id long not null comment '附件';

alter table template
    modify type_code varchar(32) not null comment '类型. 1、phone，不同的模版类型对应标签的字段不同'

alter table attachment
    modify remark varchar(255) not null comment '备注';

alter table phone_tag
    modify style_code varchar(32) not null comment '样式';
