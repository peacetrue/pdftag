import React from 'react';
import {DateField, Edit, PasswordInput, ReferenceField, SimpleForm, TextField} from 'react-admin';
import roleField from "./role";
import userRules from "./rules";

export const UserEdit = (props) => {
    console.info('UserEdit:', props);
    return (
        <Edit undoable={false} {...props} >
            <SimpleForm>
                <TextField label={'用户名'} source="username"/>
                <PasswordInput label={'密码'} source="password" validate={userRules.password}/>
                {roleField}
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
