import React from 'react';
import {
    Button,
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
import {useFormState} from 'react-final-form';


const ImportsButton = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const formState = useFormState();
    const onImports = () => {
        console.info("formState:", formState);
        false && dataProvider
            .create('phone-tags', {query: {type: 'imports'}, data: {isApproved: true},})
            .then(response => {
                // success side effects go here
                redirect('/comments');
                notify('Comment approved');
            })
            .catch(error => {
                // failure side effects go here
                notify(`Comment approval error: ${error.message}`, 'warning');
            })
    };

    return <Button label="导入" onClick={onImports}/>;
};

const PostCreateToolbar = props => {
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
            {/*<ImportsButton/>*/}
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
            <SimpleForm toolbar={<PostCreateToolbar/>}>
                <FileInput label="CSV文件" source="file" validate={[required(),]}>
                    <FileField source="src" title="title"/>
                </FileInput>
            </SimpleForm>
        </Create>
    );
};
