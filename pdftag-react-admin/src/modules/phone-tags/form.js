import * as React from "react";
import {useState} from "react";
import {FormWithRedirect, ReferenceInput, required, SaveButton, SelectInput, TextInput,} from 'react-admin';
import {Box, Toolbar} from '@material-ui/core';
import Iframe from "react-iframe";

export const PhoneTagForm = props => {
    console.info("PhoneTagForm.props:", props);
    let pdfPath = props.record.reproductionPath || 'preview.pdf';
    let [url, setUrl] = useState(`${process.env.REACT_APP_BASE_URL}/files/${pdfPath}?type=preview`);
    return (
        <FormWithRedirect
            {...props}
            render={formProps => {
                console.info("formProps:", formProps);
                !formProps.record.id && (formProps.initialValues = {
                    styleCode: 'default',
                    templateId: 1,
                    goodsName: '5G数字移动电话机',
                    modelCode: 'M2001J2C',
                    packageContent: 'Type-C 有保护套有转接头',
                    standard: '4G 常用',
                    cmiitId: '2019',
                    networkLicense: '00-B324',
                    productName: '小米10',
                    colour: '国风雅灰',
                    storage: '8GB内存 128GB存储',
                });
                return (
                    <form>
                        <Box p="1em">
                            <Box display="flex">
                                <Box flex={2} mr="1em">
                                    {/*<Typography variant="h6" gutterBottom>具体值</Typography>*/}
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <SelectInput label={'样式'} source="styleCode" validate={[required(),]}
                                                         choices={[
                                                             {id: 'default', name: '默认样式表'},
                                                             {id: 'chinese', name: '中文样式表'},
                                                             {id: 'english', name: '英文样式表'},
                                                         ]}
                                            />
                                        </Box>
                                        <Box flex={1} ml="0.5em">
                                            <ReferenceInput label={'模版'} reference="templates" source="templateId"
                                                            validate={[required(),]}>
                                                <SelectInput optionText="name"/>
                                            </ReferenceInput>
                                        </Box>
                                    </Box>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'商品名称(goodsName)'} source="goodsName"
                                                       validate={[required(),]}
                                            />
                                        </Box>
                                        <Box flex={1} ml="0.5em">
                                            <TextInput label={'认证型号(modelCode)'} source="modelCode"
                                                       validate={[required(),]}
                                            />
                                        </Box>
                                    </Box>
                                    <TextInput label={'包装内含(packageContent)'} source="packageContent"
                                               validate={[required(),]}
                                               fullWidth/>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'执行标准(standard)'} source="standard"
                                                       validate={[required(),]}
                                            />
                                        </Box>
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'CMIIT ID(cmiitId)'} source="cmiitId"
                                                       validate={[required(),]}
                                            />

                                        </Box>
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <TextInput label={'进网许可证(networkLicense)'} source="networkLicense"
                                                   validate={[required(),]}
                                                   fullWidth/>
                                    </Box>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'产品名称(productName)'} source="productName"
                                                       validate={[required(),]}
                                            />

                                        </Box>
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'颜色(colour)'} source="colour" validate={[required(),]}
                                            />

                                        </Box>
                                    </Box>
                                    <TextInput label={'存储空间(storage)'} source="storage" validate={[required(),]}
                                               fullWidth/>
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
                            <Box display="flex" justifyContent="space-around" width="50%">
                                <SaveButton
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                />
                                <SaveButton
                                    label={'预览'}
                                    transform={data => ({
                                        _query: {
                                            _type: 'generatePdf',
                                            versionType: 'reproduction'
                                        }, ...data
                                    })}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                    onSuccess={(data) => {
                                        console.info("onSuccess.data:", data);
                                        if (!data.data) return;
                                        setUrl(`${process.env.REACT_APP_BASE_URL}/files/${data.data.data}?type=preview`)
                                    }}
                                />
                                <SaveButton
                                    label={'演示导出'}
                                    transform={data => ({
                                        _query: {
                                            _type: 'generatePdf',
                                            versionType: 'reproduction'
                                        }, ...data
                                    })}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                    onSuccess={(data) => {
                                        let url = `${process.env.REACT_APP_BASE_URL}/files/${data.data.data}?type=preview`;
                                        window.open(url);
                                        setUrl(url);
                                    }}
                                />
                                <SaveButton
                                    label="正式导出"
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
                                    onSuccess={props => {
                                        window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/${props.data.id}/export?versionType=production`);
                                    }}
                                    // variant="text"
                                />
                            </Box>
                        </Toolbar>
                    </form>
                );
            }}
        />
    );
};
