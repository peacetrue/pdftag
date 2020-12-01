import React from 'react';
import {DateField, ReferenceField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const TemplateShow = (props) => {
    console.info('TemplateShow:', props);
    return (
        <Show {...props} >
            <SimpleShowLayout>
                <TextField label={'编号'} source="code"/>
                {/*<TextField label={'类型'} source="typeCode"/>*/}
                <TextField label={'名称'} source="name"/>
                <ReferenceField label={'模版附件'} reference="attachments" source="attachmentId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                {/*<TextField label={'内容'} source="content"/>*/}
                <TextField label={'备注'} source="remark"/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};
