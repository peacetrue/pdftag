import {Button} from "react-admin";
import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
export const RecordExportButton = (props) => {
    console.info("RecordExportButton.props:", props);
    const {
        record,
        versionType = 'reproduction',
        ...rest
    } = props;
    let label = '演示导出';
    if (versionType === 'production') label = '正式导出';
    return (
        <Button
            label={label}
            onClick={e => {
                e.stopPropagation();
                window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/${record.id}/export?versionType=${versionType}`);
            }}
            {...rest}
        >
            <GetAppIcon/>
        </Button>
    )
};

