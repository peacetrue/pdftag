import * as React from 'react';
import {Fragment} from 'react';
import {
    BulkDeleteButton,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    ReferenceField,
    TextField,
    TextInput,
    FunctionField
} from 'react-admin';
import prettyBytes from 'pretty-bytes'
import {DownloadButton} from './DownloadButton'

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

const ByteTextField = ({record,source})=>(
    <TextField label={'大小（字节）'} source="sizes" format={prettyBytes}/>
);

export const AttachmentList = props => {
    console.info('AttachmentList:', props);
    return (
        <List {...props}

              filters={<Filters/>}
              bulkActionButtons={<BulkActionButtons/>}
              sort={{field: 'id', order: 'desc'}}>
            <Datagrid rowClick="show">
                <TextField label={'名称'} source="name"/>
                <TextField label={'路径'} source="path"/>
                {/*<TextField label={'大小（字节）'} source="sizes" format={prettyBytes}/>*/}
                <FunctionField label={'大小（字节）'} render={record => `${prettyBytes(record.sizes)}`} />

                {/*<TextField label={'状态编码'} source="stateId"/>*/}
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                {/*<EditButton/>*/}
                <DownloadButton/>
            </Datagrid>
        </List>
    )
};
