import React from 'react';
import {Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput} from 'react-admin';

export const TemplateCreate = (props) => {
    console.info('TemplateCreate:', props);
    return (
        <Create {...props} title={`新建${props.options.label}`}>
            <SimpleForm>
                <TextInput label={'编号'} source="code" validate={[required(),]}/>
                {/*<TextInput label={'类型'} source="typeCode" validate={[required(),]} />*/}
                {/*<SelectInput label={'类型'} source="typeCode" validate={[required(),]} choices={[*/}
                {/*    {id: 'phone', name: '手机'},*/}
                {/*]}/>*/}
                {/*<ReferenceInput label="类型" source="typeCode" reference="enums" filter={{name: 'templateType'}}>*/}
                {/*    <SelectInput optionText="name" source={'code'}/>*/}
                {/*</ReferenceInput>*/}
                <TextInput label={'名称'} source="name" validate={[required(),]}/>
                <TextInput label={'内容'} source="content" fullWidth multiline validate={[required(),]}/>
                <ReferenceInput label={'附件'} reference="attachments" source="attachmentId" validate={[required(),]}>
                    <SelectInput optionText="name"/>
                </ReferenceInput>
                <TextInput label={'备注'} source="remark" fullWidth multiline validate={[]}/>
            </SimpleForm>
        </Create>
    );
};
