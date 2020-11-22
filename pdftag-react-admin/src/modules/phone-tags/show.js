import React from 'react';
import {DateField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const PhoneTagShow = (props) => {
    console.info('PhoneTagShow:', props);
    return (
        <Show {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleShowLayout>
                <TextField label={'模版主键'} source="templateId"/>
                <TextField label={'名称'} source="name"/>
                <TextField label={'认证型号'} source="modelCode"/>
                <TextField label={'包装内容'} source="packageContent"/>
                <TextField label={'执行标准'} source="standard"/>
                <TextField label={'进网许可标志验证网址'} source="networkPermissionUrl"/>
                <TextField label={'进网许可证'} source="networkLicense"/>
                <TextField label={'内存大小，单位 G，支持保留1位小数'} source="memorySize"/>
                <TextField label={'硬盘大小，单位 G，支持保留1位小数'} source="diskSize"/>
                <TextField label={'备注'} source="remark"/>
                <TextField label={'创建者主键'} source="creatorId"/>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <TextField label={'修改者主键'} source="modifierId"/>
                <DateField label={'修改时间'} source="modifiedTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};
