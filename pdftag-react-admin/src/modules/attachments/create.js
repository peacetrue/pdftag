import React from 'react';
import {Create, FileField, FileInput, maxLength, required, SimpleForm, TextInput,} from 'react-admin';

import {transform} from "./utils";

export const AttachmentCreate = (props) => {
    console.info('AttachmentCreate:', props);
    return (
        <Create {...props} transform={data => transform(data, 'file')}>
            <SimpleForm>
                <FileInput label="附件" source="file" accept={'.zip'}
                           minSize={1} maxSize={5000000}
                           validate={[required(),]}
                           placeholder={'点击或拖拽上传，支持最大 5M 的 zip 文件'}>
                    <FileField source="src" title="title"/>
                </FileInput>
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[maxLength(255)]}/>
            </SimpleForm>
        </Create>
    );
};
