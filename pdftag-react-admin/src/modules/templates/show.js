import React from 'react';
import {DateField, ReferenceField, Show, SimpleForm, SimpleShowLayout, TextField} from 'react-admin';

export const TemplateShow = (props) => {
    console.info('TemplateShow:', props);
    return (
        <Show {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleShowLayout>
                <TextField label={'编号'} source="code"/>
                <TextField label={'类型'} source="typeCode"/>
                <TextField label={'名称'} source="name"/>
                <TextField label={'内容'} source="content"/>
                <TextField label={'备注'} source="remark"/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="view">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link="view">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};