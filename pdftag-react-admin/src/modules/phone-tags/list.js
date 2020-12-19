import React, {cloneElement, Fragment} from 'react';
import {
    BulkDeleteButton,
    CloneButton,
    CreateButton,
    Datagrid,
    DateField,
    EditButton,
    Filter,
    List,
    Loading,
    ReferenceField,
    ReferenceInput,
    sanitizeListRestProps,
    SelectInput,
    TextField,
    TextInput,
    TopToolbar,
    useGetIdentity,
    useListContext,
    usePermissions
} from 'react-admin';
import {ImportsButton} from "./ImportsButton";
import {DownloadButton} from "../files/DownloadButton";
import {useEllipsisWidth} from "../../Styles";
import {exporterBuilder} from "../../exporter";

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
            {/*<ImportsButton/>*/}
            <CreateButton label={'新建标签'} basePath={basePath}/>
            {/*
            <ExportButton
                label={'导出标签'}
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
*/}
        </TopToolbar>
    );
};

const Filters = (props) => (
    <Filter {...props}>
        {/*<ReferenceInput label={'样式'} reference="enums/ditaStyle" source="styleCode" resettable allowEmpty alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>*/}
        <ReferenceInput label={'标签种类'} reference="templates" source="templateId" resettable allowEmpty alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label={'状态'} reference="enums/phoneTagState" source="stateId" resettable allowEmpty alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput label={'产品名称'} source="productName" resettable allowEmpty alwaysOn/>
        <ReferenceInput label={'创建者'} reference="users" source="creatorId" resettable allowEmpty alwaysOn>
            <SelectInput optionText="username"/>
        </ReferenceInput>

        {/*<DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty/>*/}
        {/*<DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty/>*/}
    </Filter>
);

const BulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} undoable={false}/>
    </Fragment>
);

const DownloadPDF = ({record}) => <DownloadButton
    label={'生成文件'}
    record={record}
    filePathAttr={record.stateId === 2 ? 'productionPath' : 'reproductionPath'}
/>;

export const PhoneTagList = (props) => {
    console.info('PhoneTagList:', props);
    let classes = useEllipsisWidth();
    //管理员查看所有，其他用户查看自己的
    const {loading: identityLoading, identity} = useGetIdentity();
    const {loading: permissionsLoading, permissions} = usePermissions();
    if (identityLoading || permissionsLoading) {
        return (
            <Loading
                loadingPrimary="ra.page.loading"
                loadingSecondary="ra.message.loading"
            />
        );
    }

    return (
        <List {...props}
              actions={<ListActions/>}
              filters={<Filters/>}
              filter={{creatorId: permissions.isManager ? undefined : identity.id}}
              empty={false}
              bulkActionButtons={<BulkActionButtons/>}
            exporter={exporterBuilder(props.resource, Headers.code)}
        >
            <Datagrid rowClick="show">
                {/*<ReferenceField label={'样式'} reference="enums/ditaStyle" source="styleCode" link={false}>
                    <TextField source="name"/>
                </ReferenceField>*/}
                <ReferenceField label={'标签种类'} reference="templates" source="templateId" link={'show'} cellClassName={classes.width10}>
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField label={'状态'} reference="enums/phoneTagState" source="stateId" link={false} cellClassName={classes.width10}>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField label={'产品名称'} source="productName" cellClassName={classes.width10}/>
                <TextField label={'商品名称'} source="goodsName" cellClassName={classes.width10}/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link={'show'} cellClassName={classes.width10}>
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime cellClassName={classes.width10}/>
                <EditButton/>
                {/*<DownloadButton label={'演示版导出'} filePathAttr={'reproductionPath'}/>*/}
                {/*<DownloadButton label={'正式版导出'} filePathAttr={'productionPath'}/>*/}
                <CloneButton/>
                <DownloadPDF/>
            </Datagrid>
        </List>
    )
};
