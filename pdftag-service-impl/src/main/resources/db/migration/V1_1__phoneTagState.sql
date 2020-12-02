alter table phone_tag
    add state_id tinyint not null default 1 comment '状态.1：草稿、2：发布' after production_path;

