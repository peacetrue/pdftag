import React from 'react';
import {Edit, required, SimpleForm, TextInput, DateTimeInput} from 'react-admin';

export const AttachmentEdit = (props) => {
    console.info('AttachmentEdit:', props);
    return (
        <Edit {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleForm>
                        <TextInput label={'名称'} source="name" validate={required()}/>
                        <TextInput label={'路径'} source="path" validate={required()}/>
                        <TextInput label={'大小（字节）'} source="sizes" validate={required()}/>
                        <TextInput label={'状态编码'} source="stateId" validate={required()}/>
                        <TextInput label={'备注'} source="remark" validate={required()}/>
            </SimpleForm>
        </Edit>
    );
};
