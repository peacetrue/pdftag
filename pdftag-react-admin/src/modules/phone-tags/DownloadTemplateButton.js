import {DownloadButton} from "../files/DownloadButton";
import React from "react";

export const DownloadTemplateButton = prop => (
    <DownloadButton label={'下载 CSV 模版文件'}
                    filePath={'template-test.csv'}
                    {...prop}
    />
);

export default DownloadTemplateButton;
