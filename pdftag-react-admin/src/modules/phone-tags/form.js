import * as React from "react";
import {useState} from "react";
import {
    FormWithRedirect,
    maxLength,
    minLength,
    ReferenceInput,
    required,
    SaveButton,
    SelectInput,
    TextInput,
} from 'react-admin';
import {Box, Toolbar} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';

import Iframe from "react-iframe";
import {buildPreviewUrl} from "../files/Utils";

const requiredInstance = required();
const stateRequired = (value, values) => {
    return values.stateId === 1 ? undefined : requiredInstance(value, values)
}

export const PhoneTagForm = props => {
    console.info("PhoneTagForm.props:", props);
    let pdfPath = props.record.reproductionPath || 'preview.pdf';
    let [url, setUrl] = useState(buildPreviewUrl(pdfPath));
    return (
        <FormWithRedirect
            {...props}
            render={(formProps) => {
                console.info("formProps:", formProps);
                return (
                    <form>
                        <Box p="1em">
                            <Box display="flex">
                                <Box flex={2} mr="1em">
                                    {/*<Typography variant="h6" gutterBottom>具体值</Typography>*/}
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <ReferenceInput label={'样式'} reference="enums/ditaStyle" source="styleCode">
                                                <SelectInput optionText="name" validate={[required(),]}/>
                                            </ReferenceInput>
                                        </Box>
                                        <Box flex={1} ml="0.5em">
                                            <ReferenceInput label={'模版'} reference="templates" source="templateId">
                                                <SelectInput optionText="name" validate={[required(),]}/>
                                            </ReferenceInput>
                                        </Box>
                                    </Box>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'商品名称(goodsName)'} source="goodsName"
                                                       validate={[stateRequired, maxLength(32)]}
                                            />
                                        </Box>
                                        <Box flex={1} ml="0.5em">
                                            <TextInput label={'认证型号(modelCode)'} source="modelCode"
                                                       validate={[stateRequired, maxLength(32)]}
                                            />
                                        </Box>
                                    </Box>
                                    <TextInput label={'包装内含(packageContent)'} source="packageContent"
                                               validate={[stateRequired, maxLength(32)]}
                                               fullWidth/>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'执行标准(standard)'} source="standard"
                                                       validate={[stateRequired, maxLength(32)]}
                                            />
                                        </Box>
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'CMIIT ID(cmiitId)'} source="cmiitId"
                                                       validate={[stateRequired, maxLength(32)]}
                                            />
                                        </Box>
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <TextInput label={'进网许可证(networkLicense)'} source="networkLicense"
                                                   validate={[stateRequired, minLength(10), maxLength(32)]}
                                                   fullWidth/>
                                    </Box>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'产品名称(productName)'} source="productName"
                                                       validate={[stateRequired, maxLength(32)]}/>

                                        </Box>
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'颜色(colour)'} source="colour"
                                                       validate={[stateRequired, maxLength(32)]}/>
                                        </Box>
                                    </Box>
                                    <TextInput label={'存储空间(storage)'} source="storage"
                                               validate={[stateRequired, maxLength(32)]} fullWidth/>
                                    {/*<TextInput label={'备注'} source="remark" validate={[]} multiline fullWidth/>*/}
                                </Box>

                                <Box flex={2} ml="1em">
                                    {/*<Typography variant="h6" gutterBottom>预览</Typography>*/}
                                    <Iframe id="preview"
                                            url={url}
                                            width="100%"
                                            height="100%"
                                            display="initial"
                                            position="relative"
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-around" width="60%">
                                <SaveButton
                                    label={'发布'}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 2);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}
                                />
                                {formProps.record.stateId !== 2 ? (<SaveButton
                                    label={'保存草稿'}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 1);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}
                                    variant="outlined"
                                />) : null}
                                <SaveButton
                                    label={'预览'}
                                    icon={<VisibilityIcon/>}
                                    transform={data => ({
                                        _query: {
                                            _type: 'generatePdf',
                                            versionType: 'reproduction'
                                        }, ...data
                                    })}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 1);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}
                                    onSuccess={(data) => {
                                        console.info("onSuccess.data:", data);
                                        setUrl(buildPreviewUrl(data.data.data))
                                    }}
                                    variant="outlined"
                                    // color={'secondary'}
                                />
                                <SaveButton
                                    label={'演示版导出'}
                                    icon={<GetAppIcon/>}
                                    transform={data => ({
                                        _query: {
                                            _type: 'generatePdf',
                                            versionType: 'reproduction'
                                        }, ...data
                                    })}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 2);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}

                                    onSuccess={(data) => {
                                        let url = buildPreviewUrl(data.data.data);
                                        window.open(url);
                                        setUrl(url);
                                    }}
                                    variant="outlined"
                                />
                                <SaveButton
                                    label="正式版导出"
                                    icon={<GetAppIcon/>}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 2);
                                        return formProps.handleSubmitWithRedirect(event);
                                    }}
                                    onSuccess={props => {
                                        window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/${props.data.id}/export?versionType=production`);
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                        </Toolbar>
                    </form>
                );
            }}
        />
    )
};
