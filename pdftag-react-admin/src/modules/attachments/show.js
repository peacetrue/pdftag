import React from 'react';
import {DateField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const AttachmentShow = (props) => {
    console.info('AttachmentShow:', props);
    return (
        <Show {...props} title={`${props.options.label}#${props.id}`}>
            <SimpleShowLayout>
                        <TextField label={'名称'} source="name"/>
                        <TextField label={'路径'} source="path"/>
                        <TextField label={'大小（字节）'} source="sizes"/>
                        <TextField label={'状态编码'} source="stateId"/>
                        <TextField label={'备注'} source="remark"/>
                        <TextField label={'创建者主键'} source="creatorId"/>
                        <DateField label={'创建时间'} source="createdTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};
