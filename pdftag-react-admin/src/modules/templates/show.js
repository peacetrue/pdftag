import React from 'react';
import {DateField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const TemplateShow = (props) => {
    console.info('TemplateShow:', props);
    return (
        <Show {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleShowLayout>
                <TextField label={'编号'} source="code"/>
                <TextField label={'类型：1、phone，不同的模版类型对应标签的字段不同'} source="typeId"/>
                <TextField label={'名称'} source="name"/>
                <TextField label={'内容'} source="content"/>
                <TextField label={'备注'} source="remark"/>
                <TextField label={'创建者主键'} source="creatorId"/>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <TextField label={'修改者主键'} source="modifierId"/>
                <DateField label={'修改时间'} source="modifiedTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};
