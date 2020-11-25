import React, {useCallback} from 'react';
import {Create, ReferenceInput, required, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar,} from 'react-admin';
import qs from "qs";

const ReproductionExportButton = props => {
    const handleSave = useCallback(
        (values, redirect) => {
            let params = qs.stringify(values, {
                arrayFormat: 'repeat',
                serializeDate: (d) => d.getTime().toString(),
                allowDots: true,
            })
            window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/export?versionType=reproduction&${params}`);
        }, []
    );
    return <SaveButton {...props} label={'演示导出'} onSave={handleSave}/>;
};

const PhoneTagToolbar = props => {
    console.info("PhoneTagToolbar.props:", props);
    return (
        <Toolbar {...props} >
            <SaveButton
                label="保存"
                redirect="show"
                submitOnEnter={true}
            />
            <ReproductionExportButton variant="text"/>
            <SaveButton
                label="正式导出"
                submitOnEnter={false}
                onSuccess={props => {
                    window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/${props.data.id}/export?versionType=production`);
                }}
                variant="text"
            />
        </Toolbar>
    )
};

export const PhoneTagCreate = (props) => {
    console.info('PhoneTagCreate:', props);
    return (
        <Create {...props} title={`新建${props.options.label}`}>
            <SimpleForm toolbar={<PhoneTagToolbar/>}>
                <SelectInput label={'样式'} source="styleCode" validate={[required(),]} choices={[
                    {id: 'chinese', name: '中文样式表'},
                    {id: 'english', name: '英文样式表'},
                ]} defaultValue={'chinese'}/>
                <ReferenceInput label={'模版'} reference="templates" source="templateId" validate={[required(),]}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput label={'商品名称'} source="goodsName" validate={[required(),]} defaultValue={'5G数字移动电话机'}/>
                <TextInput label={'认证型号'} source="modelCode" validate={[required(),]} defaultValue={'M2001J2C'}/>
                <TextInput label={'包装内含'} source="packageContent" validate={[required(),]}
                           defaultValue={'Type-C 有保护套有转接头'}/>
                <TextInput label={'执行标准'} source="standard" validate={[required(),]} defaultValue={'4G常用'}/>
                <TextInput label={'CMIIT ID'} source="cmiitId" validate={[required(),]} defaultValue={'2019'}/>
                <TextInput label={'进网许可证'} source="networkLicense" validate={[required(),]} defaultValue={'00-B324'}/>
                <TextInput label={'产品名称'} source="productName" validate={[required(),]} defaultValue={'小米 10'}/>
                <TextInput label={'颜色'} source="colour" validate={[required(),]} defaultValue={'国风雅灰'}/>
                <TextInput label={'存储空间'} source="storage" validate={[required(),]} defaultValue={'8GB内存 128GB存储'}/>
                <TextInput label={'备注'} source="remark" validate={[]} fullWidth multiline/>
            </SimpleForm>
        </Create>
    );
};
