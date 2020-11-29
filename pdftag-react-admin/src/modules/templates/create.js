import React from 'react';
import {Create, FileField, FileInput, required, SimpleForm, TextInput, useDataProvider} from 'react-admin';
import transformFactory from "../attachments/Upload";

export const TemplateCreate = (props) => {
    console.info('TemplateCreate:', props);
    let dataProvider = useDataProvider();
    ///*initialValues={{code: 'test01', name: 'test01'}}*/
    return (
        <Create {...props} title={`新建${props.options.label}`}
                transform={transformFactory(dataProvider, 'attachmentId')}>
            <SimpleForm >
                <TextInput label={'编号'} source="code" validate={[required(),]} placeholder={'请输入唯一的编号'}/>
                <TextInput label={'名称'} source="name" validate={[required(),]}/>
                <FileInput label="模版附件" source="attachmentId" accept={'.zip'} validate={required()}>
                    <FileField source="src" title="title"/>
                </FileInput>
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[]}/>
            </SimpleForm>
        </Create>
    );
};
