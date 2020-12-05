import * as React from 'react';
import {Fragment} from 'react';
import {
    BulkDeleteButton,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    FunctionField,
    List,
    ReferenceField,
    TextField,
    TextInput
} from 'react-admin';
import prettyBytes from 'pretty-bytes'
import {DownloadButton} from '../files/DownloadButton'

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'名称'} source="name" allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

const BulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton {...props} undoable={false}/>
    </Fragment>
);

export const AttachmentList = props => {
    console.info('AttachmentList:', props);
    return (
        <List {...props}
              filters={<Filters/>}
              bulkActionButtons={<BulkActionButtons/>}
              sort={{field: 'id', order: 'desc'}}
              exporter={false}
        >
            <Datagrid rowClick="show">
                <TextField label={'名称'} source="name"/>
                <TextField label={'路径'} source="path"/>
                <FunctionField label={'大小（字节）'} render={record => `${prettyBytes(record.sizes)}`}/>
                {/*<TextField label={'状态编码'} source="stateId"/>*/}
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <DownloadButton/>
            </Datagrid>
        </List>
    )
};
