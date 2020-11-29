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
                notify(`导入成功！`);
            })
            .catch(error => {
                // failure side effects go here
                notify(`导入失败: ${error.message}`, 'warning');
            });
    }
    return (
        <Toolbar {...props} >
            <SaveButton label={'导入'} onSuccess={handleSuccess}/>
        </Toolbar>
    );
};

const toFormData = file => {
    let formData = new FormData();
    formData.append("file", file, file.name)
    return formData;
}

const transform = data => {
    console.info("transform data:", data);
    let formData = toFormData(data.file.rawFile);
    data.remark && formData.append("remark", data.remark);
    formData.append("_query", JSON.stringify({type: 'imports'}));
    return formData;
}

export const PhoneTagImports = (props) => {
    console.info('PhoneTagImports:', props);
    return (
        <Create title={`导入标签`} basePath={'/phone-tags'} resource={'phone-tags'} transform={transform}>
            <SimpleForm toolbar={<PhoneTagImportsToolbar/>}>
                <FileInput label="CSV文件" source="file" accept=".csv" validate={[required(),]}>
                    <FileField source="src" title="title"/>
                </FileInput>
            </SimpleForm>
        </Create>
    );
};
