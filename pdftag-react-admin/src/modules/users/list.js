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
import Role from "./Role";

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'用户名'} source="username" resettable allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" resettable allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" resettable allowEmpty alwaysOn/>
    </Filter>
);

export const UserList = ({permissions, ...props}) => {
    console.info('UserList:', props);
    return (
        <List {...props}
              filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}
        >
            <Datagrid rowClick="show">
                <TextField label={'用户名'} source="username"/>
                {Role}
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
