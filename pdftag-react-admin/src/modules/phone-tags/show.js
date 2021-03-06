import React from 'react';
import {DateField, ReferenceField, Show, SimpleShowLayout, TextField} from 'react-admin';

export const PhoneTagShow = (props) => {
    console.info('PhoneTagShow:', props);
    return (
        <Show {...props} >
            <SimpleShowLayout>
                <ReferenceField label={'标签种类'} reference="templates" source="templateId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField label={'商品名称'} source="goodsName"/>
                <TextField label={'认证型号'} source="modelCode"/>
                <TextField label={'包装内含'} source="packageContent"/>
                <TextField label={'执行标准'} source="standard"/>
                <TextField label={'进网许可标志验证网址'} source="networkPermissionUrl"/>
                <TextField label={'商标'} source="brand"/>
                <TextField label={'制造商'} source="manufacturer"/>
                <TextField label={'制造商地址'} source="manufacturerAddress"/>
                <TextField label={'CMIIT ID'} source="cmiitId"/>
                <TextField label={'进网许可证'} source="networkLicense"/>
                <TextField label={'产品名称'} source="productName"/>
                <TextField label={'颜色'} source="colour"/>
                <TextField label={'存储空间'} source="storage"/>
                <DateField label={'生产日期'} source="productDate"/>
                <ReferenceField label={'创建者'} reference="users" source="creatorId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'创建时间'} source="createdTime" showTime/>
                <ReferenceField label={'修改者'} reference="users" source="modifierId" link="show">
                    <TextField source="username"/>
                </ReferenceField>
                <DateField label={'最近修改时间'} source="modifiedTime" showTime/>
            </SimpleShowLayout>
        </Show>
    );
};
