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
import { makeStyles } from '@material-ui/core/styles';

const Filters = (props) => (
    <Filter {...props}>
        <TextInput label={'编号'} source="code" resettable allowEmpty alwaysOn/>
        <TextInput label={'名称'} source="name" resettable allowEmpty alwaysOn/>
        <DateInput label={'创建时间起始值'} source="createdTime.lowerBound" allowEmpty alwaysOn/>
        <DateInput label={'创建时间结束值'} source="createdTime.upperBound" allowEmpty alwaysOn/>
    </Filter>
);

const useListStyles = makeStyles({
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

export const TemplateList = props => {
    console.info('TemplateList:', props);
    const classes = useListStyles();
    return (
        <List {...props} title={`${props.options.label}列表`} filters={<Filters/>}
              sort={{field: 'createdTime', order: 'desc'}}>
            <Datagrid rowClick="show">
                <TextField label={'编号'} source="code"/>
                {/*<TextField label={'类型'} source="typeCode"/>*/}
                <TextField label={'名称'} source="name"/>
                {/*<TextField label={'内容'} source="content" cellClassName={classes.comment}/>*/}
                {/*<TextField label={'备注'} source="remark"/>*/}
                {/*<TextField label={'创建者主键'} source="creatorId"/>*/}

                <ReferenceField label={'模版附件'} reference="attachments" source="attachmentId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                {/*<TextField label={'修改者主键'} source="modifierId"/>*/}
                {/*<DateField label={'修改时间'} source="modifiedTime" showTime/>*/}
                <EditButton/>
            </Datagrid>
        </List>
    )
};
