import React from 'react';
import {
    Button,
    Create,
    FileField,
    FileInput,
    required,
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
    return (
        <Toolbar {...props} >
            <ImportsButton/>
        </Toolbar>
    );
};

function toFormData(file) {
    let formData = new FormData();
    formData.append("file", file, file.name)
    return formData;
}

const transform = data => {
    console.info("data:", data);
    return toFormData(data.file.rawFile);
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
