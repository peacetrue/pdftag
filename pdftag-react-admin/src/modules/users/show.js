import React from 'react';
import {DateField, FunctionField, ReferenceField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const UserShow = (props) => {
    console.info('UserShow:', props);
    return (
        <Show {...props} >
            <SimpleShowLayout>
                <TextField label={'用户名'} source="username"/>
                <TextField label={'密码'} source="password"/>
                <FunctionField label={'角色'} render={record => record.username === 'admin' ? '管理员' : '普通用户'}/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link={'show'}>
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link={'show'}>
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};
