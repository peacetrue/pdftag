import React from 'react';
import {
    Create,
    FileField,
    FileInput,
    required,
    SaveButton,
    SimpleForm,
    Toolbar,
    useDataProvider,
    useNotify,
    useRedirect
} from 'react-admin';

import {toFormData} from "../files/Utils";
import {DownloadButton} from "../files/DownloadButton";

const PhoneTagImportsToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const handleSuccess = (props) => {
        console.info("handleSuccess.props:", props);
        let errorMessages = props.data.errorMessages;
        if (errorMessages && errorMessages.length > 0) {
            notify(`导入失败！${errorMessages.map(item => item.errorMessage).join(',')}`);
            return;
        }

        let records = props.data.checkedRecords;
        Promise.all(records.map(record => dataProvider.create('phone-tags', {data: record.row})))
            .then(response => {
                // success side effects go here
                redirect('/phone-tags');
                notify(`标签导入成功！`);
            })
            .catch(error => {
                // failure side effects go here
                notify(`标签导入失败: ${error.message}`, 'warning');
            });
    }
    return (
        <Toolbar {...props} >
            <SaveButton label={'导入标签'} onSuccess={handleSuccess}/>
        </Toolbar>
    );
};


export const PhoneTagImports = (props) => {
    console.info('PhoneTagImports:', props);
    return (
        <Create title={`导入 标签`}
                basePath={'/phone-tags'}
                resource={'phone-tags'}
                transform={data => toFormData(data, 'file')}
        >
            <SimpleForm toolbar={<PhoneTagImportsToolbar/>}>

                <FileInput label="上传 CSV 文件" source="file" accept=".csv" validate={[required(),]}>
                    <FileField source="src" title="title"/>
                </FileInput>
            </SimpleForm>
        </Create>
    );
};
