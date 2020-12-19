import * as React from "react";
import {useState} from "react";
import {
    BooleanInput,
    DateInput,
    FormWithRedirect,
    maxLength,
    minLength,
    ReferenceInput,
    required,
    SaveButton,
    SelectInput,
    TextInput,
    useNotify
} from 'react-admin';
import {Box, Toolbar} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import Iframe from "react-iframe";
import {buildDownloadUrl, buildPreviewUrl} from "../files/utils";
import UploadButton from "./UploadButton";
import PublishIcon from '@material-ui/icons/Publish';
import Headers from "./headers";
import Papa from 'papaparse'
import DraftsIcon from '@material-ui/icons/Drafts';
import ExportDetailButton from "./ExportDetailButton";
// import PrintIcon from '@material-ui/icons/Print';
//
const stateIds = {'1': 'reproductionPath', '2': 'productionPath'};
const templateIds = {
    '1': ['standard', 'cmiitId', 'networkLicense'],
    '2': ['brand', 'manufacturer', 'manufacturerAddress']
}
const requiredInstance = required();
const stateRequired = (value, values) => {
    if (values.stateId === 2) return requiredInstance(value, values);
}

const styleStateRequiredBuilder = (source) => {
    return (value, values) => {
        if (!values.templateId) return;
        let fields = templateIds[values.templateId];
        if (fields && fields.includes(source)) return stateRequired(value, values);
    };
}

export const PhoneTagForm = props => {
    console.info("PhoneTagForm.props:", props);
    let pdfPath = props.record[stateIds[props.record.stateId]] || 'preview.pdf';//'#zoom=160%'
    let [url, setUrl] = useState(buildPreviewUrl(pdfPath, 'preview.pdf' === pdfPath ? undefined : '#zoom=160%'));
    let notify = useNotify();
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
                                        {/*<Box flex={1} mr="0.5em">
                                            <ReferenceInput label={'样式'} reference="enums/ditaStyle" source="styleCode">
                                                <SelectInput optionText="name" validate={[required(),]}/>
                                            </ReferenceInput>
                                        </Box>*/}
                                        <Box flex={1} ml="0.5em">
                                            <ReferenceInput label={'标签种类'} reference="templates" source="templateId">
                                                <SelectInput optionText="name" validate={[required(),]}/>
                                            </ReferenceInput>
                                        </Box>
                                        <Box flex={1} ml="0.5em">
                                            <TextInput label={'商标(brand)'} source="brand"
                                                       validate={[styleStateRequiredBuilder('brand'), maxLength(32)]}
                                            />
                                        </Box>
                                    </Box>
                                    {/*<ReferenceInput label={'模版'} reference="templates" source="templateId">
                                        <SelectInput optionText="name" validate={[required(),]} fullWidth/>
                                    </ReferenceInput>*/}
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
                                               validate={[stateRequired, maxLength(255)]}
                                               fullWidth/>
                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'执行标准(standard)'} source="standard"
                                                       validate={[styleStateRequiredBuilder('standard'), maxLength(255)]}
                                            />
                                        </Box>
                                        <Box flex={1} mr="0.5em">
                                            <TextInput label={'CMIIT ID(cmiitId)'} source="cmiitId"
                                                       validate={[maxLength(32)]}
                                            />
                                        </Box>
                                    </Box>
                                    {<Box flex={1} ml="0.5em">
                                        <TextInput label={'进网许可证(networkLicense)'} source="networkLicense"
                                                   validate={[minLength(10), maxLength(32)]}
                                                   fullWidth/>
                                    </Box>}
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
                                    <TextInput label={'制造商(manufacturer)'} source="manufacturer"
                                               validate={[styleStateRequiredBuilder('manufacturer'), maxLength(255)]}
                                               fullWidth/>
                                    <TextInput label={'制造商地址(manufacturerAddress)'} source="manufacturerAddress"
                                               validate={[styleStateRequiredBuilder('manufacturerAddress'), maxLength(255)]}
                                               fullWidth/>

                                    <Box display="flex">
                                        <Box flex={1} mr="0.5em">
                                            <DateInput label={'生产日期(productDate)'} source={'productDate'}
                                                       validate={[stateRequired]}/>
                                        </Box>
                                        <Box flex={1} mr="0.5em">
                                            <BooleanInput label="有无水印" source="watermark"/>
                                        </Box>
                                    </Box>

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
                                            scrolling={'yes'}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Toolbar>
                            <Box display="flex" justifyContent="space-around"
                                 width={`${formProps.record.stateId === 2 ? 50 : 70}%`}>
                                {formProps.record.stateId === 2 ? null : (<UploadButton
                                    label={'导入数据'}
                                    icon={<PublishIcon/>}
                                    accept={'.csv'}
                                    onChange={files => {
                                        Papa.parse(files[0], {
                                            complete(results, file) {
                                                console.log("Parsing complete:", results, file);
                                                let rows = results.data.filter(item => Boolean(item)).map(row => row.map(item => item.trim()));
                                                if (rows.length < 2) {
                                                    return notify('至少需要 2 行，第 1 行为标题，第 2 行为数据！', 'error', false, null);
                                                }
                                                let headers = rows[0];
                                                console.info("headers:", headers);
                                                for (let i = 0; i < headers.length; i++) {
                                                    if (headers[i] !== Headers.name[i]) {
                                                        return notify(`第 ${i + 1} 列，标题'${headers[i]}'错误，必须是'${Headers.name[i]}'`, 'error', false, null)
                                                    }
                                                }
                                                let values = rows[1];
                                                values.forEach((item, index) => {
                                                    //if (Headers.code[index] === 'templateId') return;
                                                    formProps.form.change(Headers.code[index], item);
                                                });

                                            }
                                        })
                                    }}
                                />)}
                                <ExportDetailButton resource={props.resource} headers={Headers.code}/>
                                <SaveButton
                                    label={'生成文件'}
                                    icon={<GetAppIcon/>}
                                    transform={({watermark, ...data}) => ({
                                        _query: {
                                            _type: 'generatePdf',
                                            versionType: watermark ? 'reproduction' : 'production'
                                        }, ...data
                                    })}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 1);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}

                                    onSuccess={(data) => {
                                        window.open(buildDownloadUrl(data.data.original));
                                        setUrl(buildPreviewUrl(data.data.original, '#zoom=160%'));
                                    }}
                                    variant="outlined"
                                />
                                <SaveButton
                                    label={'预览效果'}
                                    icon={<VisibilityIcon/>}
                                    transform={({watermark, ...data}) => ({
                                        _query: {
                                            _type: 'generatePdf',
                                            versionType: watermark ? 'reproduction' : 'production'
                                        }, ...data
                                    })}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 1);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}
                                    onSuccess={(data) => {
                                        console.info("onSuccess.data:", data);
                                        setUrl(buildPreviewUrl(data.data.original, '#zoom=160%'));
                                    }}
                                    variant="outlined"
                                    // color={'secondary'}
                                />
                                {formProps.record.stateId !== 2 ? (<SaveButton
                                    label={'保存草稿'}
                                    icon={<DraftsIcon/>}
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 1);
                                        return formProps.handleSubmitWithRedirect(event)
                                    }}
                                    variant="outlined"
                                />) : null}
                                <SaveButton
                                    label={`${formProps.record.stateId === 2 ? '修改' : '创建'}标签`}
                                    redirect="list"
                                    saving={formProps.saving}
                                    handleSubmitWithRedirect={event => {
                                        formProps.form.change('stateId', 2);
                                        return formProps.handleSubmitWithRedirect(event)
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
