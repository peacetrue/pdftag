import React, {useCallback} from "react";
import qs from "qs";
import {SaveButton} from "react-admin";

export const ReproductionViewExportButton = props => {
    const handleSave = useCallback((values, redirect) => {
            let params = qs.stringify(values, {
                arrayFormat: 'repeat',
                serializeDate: (d) => d.getTime().toString(),
                allowDots: true,
            })
            window.open(`${process.env.REACT_APP_BASE_URL}/phone-tags/export?versionType=reproduction&${params}`);
        }, []
    );
    return <SaveButton {...props} label={'演示导出'} onSave={handleSave}/>;
};
