import React from 'react';
import {
    DateField,
    Edit,
    ListButton,
    maxLength,
    maxValue,
    minLength,
    minValue,
    ReferenceField,
    regex,
    required,
    ShowButton,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar
} from 'react-admin';
import {DownloadButton} from "../files/DownloadButton";

const AttachmentActions = ({basePath, data, resource}) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <ShowButton basePath={basePath} record={data}/>
        <DownloadButton filePath={data.path}/>
    </TopToolbar>
);

export const AttachmentEdit = (props) => {
    console.info('AttachmentEdit:', props);
    return (
        <Edit actions={<AttachmentActions/>} {...props} >
            <SimpleForm>
                <TextInput label={'名称'} source="name" validate={[required(), maxLength(32)]}/>
                <TextField label={'路径'} source="path" fullWidth/>
                <TextInput label={'大小（字节）'} source="sizes"
                           validate={[required(), minValue(1), maxValue(5000000)]}/>
                {/*<TextInput label={'状态编码'} source="stateId" validate={required()}/>*/}
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[maxLength(255)]}/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
            </SimpleForm>
        </Edit>
    );
};
