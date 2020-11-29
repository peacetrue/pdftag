import React from 'react';
import {
    DateField,
    Edit, FileField, FileInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput, useDataProvider
} from 'react-admin';
import UploadInput from "../attachments/Upload";
import transformFactory from "../attachments/Upload";

export const TemplateEdit = (props) => {
    console.info('TemplateEdit:', props);
    let dataProvider = useDataProvider();
    return (
        <Edit {...props} title={`${props.options.label}#${props.id}`}
              transform={transformFactory(dataProvider, 'attachmentId')}>
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={required()}/>
                {/*<TextInput label={'类型'} source="typeCode" validate={required()}/>*/}
                <TextInput label={'名称'} source="name" validate={required()}/>
                <ReferenceField label={'模版附件'} reference="attachments" source="attachmentId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <FileInput label="模版附件" source="attachmentId" accept={'.zip'} validate={required()}>
                    <FileField source="src" title="title"/>
                </FileInput>
                {/*<TextInput label={'内容'} source="content" fullWidth multiline validate={required()}/>*/}
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[]}/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
            </SimpleForm>
        </Edit>
    );
};
