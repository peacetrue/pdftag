import React from 'react';
import {DateField, Edit, ReferenceField, required, SimpleForm, TextField, TextInput} from 'react-admin';

export const TemplateEdit = (props) => {
    console.info('TemplateEdit:', props);
    return (
        <Edit {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={required()}/>
                {/*<TextInput label={'类型'} source="typeCode" validate={required()}/>*/}
                <TextInput label={'名称'} source="name" validate={required()}/>
                <TextInput label={'内容'} source="content" fullWidth multiline validate={required()}/>
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[]}/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="view">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link="view">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
            </SimpleForm>
        </Edit>
    );
};
