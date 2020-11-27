import React, {cloneElement} from 'react';
import {
    Button,
    CreateButton,
    Datagrid,
    DateField,
    DateInput,
    ExportButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    sanitizeListRestProps,
    SelectInput,
    TextField,
    TextInput,
    TopToolbar,
    useListContext
} from 'react-admin';
import {Link} from 'react-router-dom';
import {linkToRecord} from 'ra-core';


const ListActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext();
    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <CreateButton basePath={basePath}/>
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
            {/* Add your custom actions */}
            {/*<CreateButton label={'导入'} basePath={'/phone-tags/imports'}/>*/}
            <Button
                component={Link}
                to={`/phone-tags/imports`}
                label={'导入'}
                onClick={(e) => e.stopPropagation()}
                {...rest}
            >
            </Button>
        </TopToolbar>
    );
};

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

const PhoneTagExportButton = (props) => {
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
        <List {...props} title={`${props.options.label}列表`} actions={<ListActions/>} filters={<Filters/>}
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
                <PhoneTagExportButton/>
                <PhoneTagExportButton versionType="production"/>
            </Datagrid>
        </List>
    )
};
