import React from 'react';
import {Datagrid, DateInput, DateField, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

const Filters = (props) => (
    <Filter {...props}>
                <TextInput label={'名称'} source="name" allowEmpty alwaysOn/>
                <TextInput label={'路径'} source="path" allowEmpty alwaysOn/>
                <TextInput label={'备注'} source="remark" allowEmpty alwaysOn/>
                <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
                <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

export const AttachmentList = props => {
    console.info('AttachmentList:', props);
    return (
        <List {...props} title={`${props.options.label}列表`} filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
                        <TextField label={'名称'} source="name"/>
                        <TextField label={'路径'} source="path"/>
                        <TextField label={'大小（字节）'} source="sizes"/>
                        <TextField label={'状态编码'} source="stateId"/>
                        <TextField label={'备注'} source="remark"/>
                        <TextField label={'创建者主键'} source="creatorId"/>
                        <DateField label={'创建时间'} source="createdTime" showTime/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};
