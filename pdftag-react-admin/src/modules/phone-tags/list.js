import React from 'react';
import {
    Button,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TextField,
    TextInput
} from 'react-admin';


const Filters = (props) => (
    <Filter {...props}>
        <SelectInput label={'样式'} source="styleCode" resettable allowEmpty alwaysOn choices={[
            {id: 'chinese', name: '中文样式表'},
            {id: 'english', name: '英文样式表'},
        ]}/>
        <ReferenceInput label={'模版'} reference="templates" source="templateId" resettable allowEmpty alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput label={'商品名称'} source="goodsName" resettable allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty/>
    </Filter>
);

const ExportButton = (props) => {
    console.info("PdfButton.props:", props);
    const {
        record,
        versionType = 'reproduction',
        ...rest
    } = props;
    let label = '演示导出';
    if (versionType === 'production') label = '正式导出';
    return (
        <Button
            label={label}
            onClick={e => {
                e.stopPropagation();
                window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/${record.id}/export?versionType=${versionType}`);
            }}
            {...rest}
        >
        </Button>
    )
};

export const PhoneTagList = props => {
    console.info('PhoneTagList:', props);
    return (
        <List {...props} title={`${props.options.label}列表`} filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
                <TextField label={'样式'} source="styleCode"/>
                <ReferenceField label={'模版'} reference="templates" source="templateId" link={'view'}>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField label={'商品名称'} source="goodsName"/>
                <TextField label={'认证型号'} source="modelCode"/>
                <TextField label={'包装内含'} source="packageContent"/>
                {/*<TextField label={'执行标准'} source="standard"/>*/}
                {/*<TextField label={'存储空间'} source="storage"/>*/}
                <DateField label={'创建时间'} source="createdTime" showTime/>
                {/*<EditButton/>*/}
                <ExportButton/>
                <ExportButton versionType="production"/>
            </Datagrid>
        </List>
    )
};
