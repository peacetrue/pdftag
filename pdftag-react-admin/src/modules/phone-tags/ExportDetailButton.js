import React from "react";
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import {useFormState} from "react-final-form";
import {exporterBuilder} from "../../exporter";

export const ExportDetailButton = (props) => {
    let {
        label = '导出数据',
        resource,
        headers
    } = props;
    let {values} = useFormState();
    let exporter = exporterBuilder(resource, headers);
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
