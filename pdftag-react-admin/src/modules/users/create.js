import React from 'react';
import {Create, maxLength, minLength, PasswordInput, regex, required, SimpleForm, TextInput,} from 'react-admin';

export const UserCreate = (props) => {
    console.info('UserCreate:', props);
    let validate = [required(), minLength(6), maxLength(32), regex(/^[0-9a-zA-Z-.]+$/)];
    return (
        <Create {...props} title={`新建${props.options.label}`}>
            <SimpleForm>
                <TextInput label={'用户名'} source="username" validate={validate}/>
                <PasswordInput label={'密码'} source="password" validate={validate}/>
            </SimpleForm>
        </Create>
    );
};
