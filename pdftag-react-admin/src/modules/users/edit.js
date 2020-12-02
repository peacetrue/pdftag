import React from 'react';
import {
    DateField,
    Edit,
    maxLength,
    minLength,
    PasswordInput,
    ReferenceField,
    regex,
    required,
    SimpleForm,
    TextField
} from 'react-admin';
import Role from "./Role";

export const UserEdit = (props) => {
    console.info('UserEdit:', props);
    let validate = [required(), minLength(6), maxLength(32), regex(/^[0-9a-zA-Z-.]+$/)];
    return (
        <Edit undoable={false} {...props} >
            <SimpleForm>
                <TextField label={'用户名'} source="username"/>
                <PasswordInput label={'密码'} source="password" validate={validate}/>
                {Role}
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
