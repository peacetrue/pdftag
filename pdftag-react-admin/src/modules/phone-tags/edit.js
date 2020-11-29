import React from 'react';
import {Edit, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';
import {PhoneTagForm} from "./form";

export const PhoneTagEdit = (props) => {
    console.info('PhoneTagEdit:', props);
    return (
        <Edit {...props} undoable={false} title={`${props.options.label}#${props.id}`}>
            <PhoneTagForm/>
        </Edit>
    );
};
