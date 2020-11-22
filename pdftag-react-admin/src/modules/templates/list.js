import React from 'react';
import {Datagrid, DateField, DateInput, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'编号'} source="code" allowEmpty alwaysOn/>
        <TextInput label={'名称'} source="name" allowEmpty alwaysOn/>
        <TextInput label={'内容'} source="content" allowEmpty alwaysOn/>
        <TextInput label={'备注'} source="remark" allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
        <DateInput label={'修改时间起始值'} source="modifiedTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'修改时间结束值'} source="modifiedTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

export const TemplateList = props => {
    console.info('TemplateList:', props);
    return (
        <List {...props} title={`${props.options.label}列表`} filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
                <TextField label={'编号'} source="code"/>
                <TextField label={'类型：1、phone，不同的模版类型对应标签的字段不同'} source="typeId"/>
                <TextField label={'名称'} source="name"/>
                <TextField label={'内容'} source="content"/>
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
