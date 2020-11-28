import React from 'react';
import {Create,} from 'react-admin';
import {PhoneTagForm} from './form'

export const PhoneTagCreate = (props) => {
    console.info('PhoneTagCreate:', props);
    return (
        <Create {...props} title={`新建${props.options.label}`}>
            <PhoneTagForm/>
        </Create>
    );
};
