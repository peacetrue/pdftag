import React from 'react';
import {
    Create,
    FileField,
    FileInput,
    required,
    SaveButton,
    SimpleForm,
    Toolbar,
    useAuthenticated,
    useDataProvider,
    useNotify,
    useRedirect
} from 'react-admin';

import {toFormData} from "../files/utils";
import {DownloadTemplateButton} from "./DownloadTemplateButton";
import PublishIcon from '@material-ui/icons/Publish';
import Box from '@material-ui/core/Box';


const PhoneTagImportsToolbar = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();
    const handleSuccess = (props) => {
        console.info("handleSuccess.props:", JSON.stringify(props));
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
                notify(`标签导入成功！`, 'success', {}, false, null);
            })
            .catch(error => {
                // failure side effects go here
                notify(`标签导入失败: ${error.message}`, 'warning', {}, false, null);
            });
    }
    return (
        <Toolbar {...props} >
            <SaveButton icon={<PublishIcon/>}
                        label={'批量导入标签'}
                        onSuccess={handleSuccess}
                        onFailure={(error) => notify(`标签导入失败: ${error.message}`, 'warning', {}, false, null)}/>
        </Toolbar>
    );
};


export const PhoneTagImports = (props) => {
    console.info('PhoneTagImports:', props);
    useAuthenticated();
    return (
        <Create title={`导入 标签`}
                basePath={'/phone-tags'}
                resource={'phone-tags'}
                transform={data => toFormData(data, 'file')}
        >
            <SimpleForm toolbar={<PhoneTagImportsToolbar/>}>
                <DownloadTemplateButton/>
                <Box component="p" color="text.secondary" fontSize={12} fullWidth>
                    下载 CSV 模版文件后，使用 Excel 打开，编辑文件中的内容，保存后通过下面的功能上传，批量导入标签数据
                </Box>
                <FileInput label="上传 CSV 文件" source="file" accept=".csv"
                           validate={[required(),]}>
                    <FileField source="src" title="title"/>
                </FileInput>
            </SimpleForm>
        </Create>
    );
};
