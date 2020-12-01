import React from 'react';
import {Edit} from 'react-admin';
import {PhoneTagForm} from "./form";

export const PhoneTagEdit = (props) => {
    console.info('PhoneTagEdit:', props);
    return (
        <Edit {...props} undoable={false} >
            <PhoneTagForm/>
        </Edit>
    );
};
