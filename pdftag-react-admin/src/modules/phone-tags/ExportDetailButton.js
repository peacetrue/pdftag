import React from "react";
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import {useFormState} from "react-final-form";
import XLSX from 'xlsx'
import {objectToArray, pivotMatrix} from "../files/parser";
import {Headers} from "./headers";

export const leftPad = (value) => {
    return String(value).padStart(2, '0');
}

export const buildFileName = (entity) => {
    let date = new Date()
    let name = entity.templateId === 1 ? '礼盒标签中文模版' : '礼盒标签英文模版';
    return `${entity.productName || '未定义'}${name}-${leftPad(date.getHours())}${leftPad(date.getMinutes())}${leftPad(date.getSeconds())}`;
}

export const ExportDetailButton = (props) => {
    let {
        label = '导出数据',
    } = props;
    let {values} = useFormState();
    let download = e => {
        e.stopPropagation();
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(pivotMatrix([Headers.name, objectToArray(values, Headers.code)]));
        let fileName = buildFileName(values);
        XLSX.utils.book_append_sheet(wb, ws, fileName);
        XLSX.writeFile(wb, `${fileName}.xlsx`, {compression: true});
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
