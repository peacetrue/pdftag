import React, {cloneElement} from 'react';
import {
    CreateButton,
    Datagrid,
    DateField,
    DateInput,
    EditButton,
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
import {ImportsButton} from "./ImportButton";
import {DownloadButton} from "../attachments/DownloadButton";

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
        basePath,
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
            <ImportsButton/>
            <CreateButton basePath={basePath}/>
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
        </TopToolbar>
    );
};

const Filters = (props) => (
    <Filter {...props}>
        <SelectInput label={'样式'} source="styleCode" choices={[
            {id: 'default', name: '默认样式表'},
            {id: 'chinese', name: '中文样式表'},
            {id: 'english', name: '英文样式表'},
        ]} resettable allowEmpty alwaysOn/>
        <ReferenceInput label={'模版'} reference="templates" source="templateId" resettable allowEmpty alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput label={'商品名称'} source="goodsName" resettable allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty/>
    </Filter>
);


export const PhoneTagList = props => {
    console.info('PhoneTagList:', props);
    return (
        <List {...props} title={`${props.options.label}列表`} actions={<ListActions/>} filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
                <TextField label={'样式'} source="styleName"/>
                <ReferenceField label={'模版'} reference="templates" source="templateId" link={'view'}>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField label={'商品名称'} source="goodsName"/>
                <TextField label={'产品名称'} source="productName"/>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <EditButton/>
                <DownloadButton label={'演示导出'} filePathAttr={'reproductionPath'}/>
                <DownloadButton label={'正式导出'} filePathAttr={'productionPath'}/>
            </Datagrid>
        </List>
    )
};
