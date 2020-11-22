import React from 'react';
import {Edit, required, SimpleForm, TextInput} from 'react-admin';

export const PhoneTagEdit = (props) => {
    console.info('PhoneTagEdit:', props);
    return (
        <Edit {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleForm>
                <TextInput label={'模版主键'} source="templateId" validate={required()}/>
                <TextInput label={'名称'} source="name" validate={required()}/>
                <TextInput label={'认证型号'} source="modelCode" validate={required()}/>
                <TextInput label={'包装内容'} source="packageContent" validate={required()}/>
                <TextInput label={'执行标准'} source="standard" validate={required()}/>
                <TextInput label={'进网许可标志验证网址'} source="networkPermissionUrl" validate={required()}/>
                <TextInput label={'进网许可证'} source="networkLicense" validate={required()}/>
                <TextInput label={'内存大小，单位 G，支持保留1位小数'} source="memorySize" validate={required()}/>
                <TextInput label={'硬盘大小，单位 G，支持保留1位小数'} source="diskSize" validate={required()}/>
                <TextInput label={'备注'} source="remark" validate={required()}/>
            </SimpleForm>
        </Edit>
    );
};
