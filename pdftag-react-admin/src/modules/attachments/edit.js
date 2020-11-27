import React from 'react';
import {DateField, Edit, ReferenceField, required, SimpleForm, TextField, TextInput} from 'react-admin';

export const AttachmentEdit = (props) => {
    console.info('AttachmentEdit:', props);
    return (
        <Edit {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleForm>
                <TextInput label={'名称'} source="name" validate={required()}/>
                <TextInput label={'路径'} source="path" validate={required()}/>
                <TextInput label={'大小（字节）'} source="sizes" validate={required()}/>
                {/*<TextInput label={'状态编码'} source="stateId" validate={required()}/>*/}
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[]}/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
            </SimpleForm>
        </Edit>
    );
};
