import React from 'react';
import {Datagrid, DateField, DateInput, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'名称'} source="name" allowEmpty alwaysOn/>
        <TextInput label={'认证型号'} source="modelCode" allowEmpty alwaysOn/>
        <TextInput label={'包装内容'} source="packageContent" allowEmpty alwaysOn/>
        <TextInput label={'执行标准'} source="standard" allowEmpty alwaysOn/>
        <TextInput label={'进网许可标志验证网址'} source="networkPermissionUrl" allowEmpty alwaysOn/>
        <TextInput label={'进网许可证'} source="networkLicense" allowEmpty alwaysOn/>
        <TextInput label={'备注'} source="remark" allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
        <DateInput label={'修改时间起始值'} source="modifiedTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'修改时间结束值'} source="modifiedTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

export const PhoneTagList = props => {
    console.info('PhoneTagList:', props);
    return (
        <List {...props} title={`${props.options.label}列表`} filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
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
                <EditButton/>
            </Datagrid>
        </List>
    )
};
