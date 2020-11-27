import React from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    ReferenceField,
    TextField,
    TextInput
} from 'react-admin';

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'用户名'} source="username" resettable={true} allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" resettable={true} allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" resettable={true} allowEmpty alwaysOn/>
    </Filter>
);

export const UserList = props => {
    console.info('UserList:', props);
    return (
        <List {...props} title={`${props.options.label}列表`}
              filters={<Filters/>} sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
                <TextField label={'用户名'} source="username"/>
                {/*<TextField label={'密码'} source="password"/>*/}
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};
