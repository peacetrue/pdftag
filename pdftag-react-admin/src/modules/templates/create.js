import React from 'react';
import {Create, FileField, FileInput, maxLength, required, SimpleForm, TextInput, useDataProvider} from 'react-admin';
import transformFactory from "../attachments/Upload";

export const TemplateCreate = (props) => {
    console.info('TemplateCreate:', props);
    let dataProvider = useDataProvider();
    ///*initialValues={{code: 'test01', name: 'test01'}}*/
    return (
        <Create {...props} title={`新建${props.options.label}`}
                transform={transformFactory(dataProvider, 'attachmentId')}>
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={[required(), maxLength(32)]} placeholder={'请输入唯一的编号'}/>
                <TextInput label={'名称'} source="name" validate={[required(), maxLength(32)]}/>
                <FileInput label="模版附件" source="attachmentId" accept={'.zip'}
                           minSize={1} maxSize={5000000}
                           validate={[required(),]}
                           placeholder={'点击或拖拽上传，支持最大 5M 的 zip 文件'}>
                    <FileField source="src" title="title"/>
                </FileInput>
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[maxLength(255)]}/>
            </SimpleForm>
        </Create>
    );
};
