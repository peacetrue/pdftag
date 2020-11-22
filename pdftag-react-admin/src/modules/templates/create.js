import React from 'react';
import {Create, required, SimpleForm, TextInput,} from 'react-admin';

export const TemplateCreate = (props) => {
    console.info('TemplateCreate:', props);
    return (
        <Create {...props} title={`新建${props.options.label}`}>
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={[required(),]}/>
                <TextInput label={'类型：1、phone，不同的模版类型对应标签的字段不同'} source="typeId" validate={[required(),]}/>
                <TextInput label={'名称'} source="name" validate={[required(),]}/>
                <TextInput label={'内容'} source="content" validate={[required(),]}/>
                <TextInput label={'备注'} source="remark" validate={[required(),]}/>
            </SimpleForm>
        </Create>
    );
};
