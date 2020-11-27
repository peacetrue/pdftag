import React from 'react';
import {Create, FileField, FileInput, required, SimpleForm, TextInput,} from 'react-admin';

const toFormData = file => {
    let formData = new FormData();
    formData.append("file", file, file.name)
    return formData;
}

const transform = data => {
    console.info("transform data:", data);
    let formData = toFormData(data.file.rawFile);
    data.remark && formData.append("remark", data.remark);
    formData.append("_query", JSON.stringify({fileCount: '1'}));
    return formData;
}

export const AttachmentCreate = (props) => {
    console.info('AttachmentCreate:', props);
    return (
        <Create {...props} title={`上传${props.options.label}`} transform={transform}>
            <SimpleForm>
                <FileInput label="附件" source="file" accept={'.zip'} validate={[required(),]}>
                    <FileField source="src" title="title"/>
                </FileInput>
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[]}/>
            </SimpleForm>
        </Create>
    );
};
