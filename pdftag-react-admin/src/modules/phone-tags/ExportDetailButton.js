import React from "react";
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import {useFormState} from "react-final-form";
import {exporterBuilder} from "../../exporter";

export const leftPad = (value) => {
    return String(value).padStart(2, '0');
}
export const ExportDetailButton = (props) => {
    let {
        label = '导出数据',
        resource,
        headers
    } = props;
    let {values} = useFormState();
    let exporter = exporterBuilder(resource, headers, (entity) => {
        let date = new Date()
        let name = entity.templateId === 1 ? '礼盒标签中文模版' : '礼盒标签英文模版';
        return `${entity.productName}${name}-${leftPad(date.getHours())}${leftPad(date.getMinutes())}${leftPad(date.getSeconds())}`;
    });
    let download = e => {
        e.stopPropagation();
        exporter([values]);
    };
    return (
        <Button
            startIcon={<GetAppIcon/>}
            variant="outlined"
            onClick={download}
            color={'primary'}
        >
            {label}
        </Button>
    );
}

export default ExportDetailButton;
