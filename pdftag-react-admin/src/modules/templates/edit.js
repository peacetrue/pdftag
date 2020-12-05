import React from 'react';
import {
    DateField,
    Edit,
    FileField,
    FileInput,
    maxLength,
    ReferenceField,
    required,
    SimpleForm,
    TextField,
    TextInput,
    useDataProvider
} from 'react-admin';
import transformFactory from "../attachments/utils";

export const TemplateEdit = (props) => {
    console.info('TemplateEdit:', props);
    let dataProvider = useDataProvider();
    return (
        <Edit undoable={false} {...props}
              // transform={transformFactory(dataProvider, 'attachmentId')}
        >
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={[required(), maxLength(32)]} placeholder={'请输入唯一的编号'}/>
                {/*<TextInput label={'类型'} source="typeCode" validate={required()}/>*/}
                <TextInput label={'名称'} source="name" validate={[required(), maxLength(32)]}/>
                <ReferenceField label={'模版附件'} reference="attachments" source="attachmentId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                {/*<FileInput label="模版附件" source="attachmentId" accept={'.zip'}
                           minSize={1} maxSize={5000000}
                           validate={[required(),]}
                           placeholder={'点击或拖拽上传，支持最大 5M 的 zip 文件'}>
                    <FileField source="src" title="title"/>
                </FileInput>*/}
                {/*<TextInput label={'内容'} source="content" fullWidth multiline validate={required()}/>*/}
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[maxLength(255)]}/>
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
