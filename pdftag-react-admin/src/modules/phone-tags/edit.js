import React from 'react';
import {Edit, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';

export const PhoneTagEdit = (props) => {
    console.info('PhoneTagEdit:', props);
    return (
        <Edit {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleForm>
                <SelectInput label={'样式'} source="styleCode" validate={[required(),]} choices={[
                    {id: 'chinese', name: '中文样式表'},
                    {id: 'english', name: '英文样式表'},
                ]} defaultValue={'chinese'}/>
                <ReferenceInput label={'模版'} reference="templates" source="templateId" validate={[required(),]}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput label={'商品名称'} source="goodsName" validate={[required(),]}/>
                <TextInput label={'认证型号'} source="modelCode" validate={[required(),]}/>
                <TextInput label={'包装内含'} source="packageContent" validate={[required(),]}/>
                <TextInput label={'执行标准'} source="standard" validate={[required(),]}/>
                <TextInput label={'CMIIT ID'} source="cmiitId" validate={[required(),]}/>
                <TextInput label={'进网许可证'} source="networkLicense" validate={[required(),]}/>
                <TextInput label={'产品名称'} source="productName" validate={[required(),]}/>
                <TextInput label={'颜色'} source="colour" validate={[required(),]}/>
                <TextInput label={'存储空间'} source="storage" validate={[required(),]}/>
                <TextInput label={'备注'} source="remark" validate={[]} fullWidth multiline/>
            </SimpleForm>
        </Edit>
    );
};
