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
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty/>
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
                <ReferenceField label={'样式'} reference="enums/ditaStyle" source="styleId" link={false}>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField label={'编号'} source="code"/>
                <TextField label={'名称'} source="name"/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link={'show'}>
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};
