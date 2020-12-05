import messages from "../../messages";

let codes = [
    'styleCode', 'templateId', 'goodsName',
    'modelCode', 'packageContent', 'standard', 'cmiitId',
    'networkLicense', 'productName', 'colour', 'storage'
];

export const converter = (fields, codes) => {
    return codes.map(item => fields[item]);
}

export const Headers = {
    code: codes,
    name: converter(messages.resources["phone-tags"].fields, codes)
};

export default Headers;
