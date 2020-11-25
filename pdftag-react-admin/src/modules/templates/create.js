import React from 'react';
import {CREATE, Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {dataProvider} from "../../instances";

function toFormData(files) {
    let formData = new FormData();
    files.forEach(file => formData.append("files", file, file.name));
    return formData;
}

function onDropAccepted(files, event) {
    dataProvider(CREATE, "files", {data: toFormData(files)});
}

export const TemplateCreate = (props) => {
    console.info('TemplateCreate:', props);
    return (
        <Create {...props} title={`新建${props.options.label}`}>
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={[required(),]}/>
                {/*<TextInput label={'类型'} source="typeCode" validate={[required(),]} />*/}
                {/*<SelectInput label={'类型'} source="typeCode" validate={[required(),]} choices={[*/}
                {/*    {id: 'phone', name: '手机'},*/}
                {/*]}/>*/}
                {/*<ReferenceInput label="类型" source="typeCode" reference="enums" filter={{name: 'templateType'}}>*/}
                {/*    <SelectInput optionText="name" source={'code'}/>*/}
                {/*</ReferenceInput>*/}
                <TextInput label={'名称'} source="name" validate={[required(),]}/>
                {/*<FileInput label="模版文件" source="content" accept="application/pdf" options={{onDropAccepted}}*/}
                {/*           validate={[required(),]}>*/}
                {/*    <FileField source="src" title="title"/>*/}
                {/*</FileInput>*/}
                <TextInput label={'内容'} source="content" type={'textarea'} fullWidth multiline
                           validate={[required(),]}/>
                <TextInput label={'备注'} source="remark" validate={[]} fullWidth multiline/>
            </SimpleForm>
        </Create>
    );
};
