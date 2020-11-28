import * as React from "react";
import {useState} from "react";
import {FormWithRedirect, ReferenceInput, required, SaveButton, SelectInput, TextInput,} from 'react-admin';
import {Box, Toolbar} from '@material-ui/core';
import Iframe from "react-iframe";

export const PhoneTagForm = props => {
    console.info("PhoneTagForm.props:", props);
    let [url, setUrl] = useState(`${process.env.REACT_APP_BASE_URL}/files/preview.pdf?type=preview`);
    return (
        <FormWithRedirect
            {...props}
            render={formProps => (
                <form>
                    <Box p="1em">
                        <Box display="flex">
                            <Box flex={2} mr="1em">
                                {/*<Typography variant="h6" gutterBottom>具体值</Typography>*/}
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <SelectInput label={'样式'} source="styleCode" validate={[required(),]} choices={[
                                            {id: 'chinese', name: '中文样式表'},
                                            {id: 'english', name: '英文样式表'},
                                        ]} defaultValue={'chinese'}/>
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <ReferenceInput label={'模版'} reference="templates" source="templateId"
                                                        validate={[required(),]} defaultValue={5}>
                                            <SelectInput optionText="name"/>
                                        </ReferenceInput>
                                    </Box>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput label={'商品名称(goodsName)'} source="goodsName" validate={[required(),]}
                                                   defaultValue={'5G数字移动电话机'}/>
                                    </Box>
                                    <Box flex={1} ml="0.5em">
                                        <TextInput label={'认证型号(modelCode)'} source="modelCode" validate={[required(),]}
                                                   defaultValue={'M2001J2C'}/>
                                    </Box>
                                </Box>
                                <TextInput label={'包装内含(packageContent)'} source="packageContent"
                                           validate={[required(),]}
                                           defaultValue={'Type-C 有保护套有转接头'} fullWidth/>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput label={'执行标准(standard)'} source="standard" validate={[required(),]}
                                                   defaultValue={'4G常用'}/>
                                    </Box>
                                    <Box flex={1} mr="0.5em">
                                        <TextInput label={'CMIIT ID(cmiitId)'} source="cmiitId" validate={[required(),]}
                                                   defaultValue={'2019'}/>

                                    </Box>
                                </Box>
                                <Box flex={1} ml="0.5em">
                                    <TextInput label={'进网许可证(networkLicense)'} source="networkLicense"
                                               validate={[required(),]}
                                               defaultValue={'00-B324'} fullWidth/>
                                </Box>
                                <Box display="flex">
                                    <Box flex={1} mr="0.5em">
                                        <TextInput label={'产品名称(productName)'} source="productName"
                                                   validate={[required(),]}
                                                   defaultValue={'小米 10'}/>

                                    </Box>
                                    <Box flex={1} mr="0.5em">
                                        <TextInput label={'颜色(colour)'} source="colour" validate={[required(),]}
                                                   defaultValue={'国风雅灰'}/>

                                    </Box>
                                </Box>
                                <TextInput label={'存储空间(storage)'} source="storage" validate={[required(),]}
                                           defaultValue={'8GB内存 128GB存储'} fullWidth/>
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
                        <Box display="flex" justifyContent="space-around"  width="50%">
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
                                    setUrl(url);
                                    window.open(url);
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
            )}
        />
    );
};
