import React from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
    EditButton,
    Filter,
    List,
    ReferenceField,
    TextField,
    TextInput
} from 'react-admin';
import {ConfirmBulkActionButtons} from "../../Components";

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'编号'} source="code" resettable allowEmpty alwaysOn/>
        <TextInput label={'名称'} source="name" resettable allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

export const TemplateList = props => {
    console.info('TemplateList:', props);
    return (
        <List {...props} filters={<Filters/>}
              bulkActionButtons={<ConfirmBulkActionButtons/>}
              exporter={false}
        >
            <Datagrid rowClick="show">
                <TextField label={'编号'} source="code"/>
                <TextField label={'名称'} source="name"/>
                <ReferenceField label={'模版附件'} reference="attachments" source="attachmentId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};
