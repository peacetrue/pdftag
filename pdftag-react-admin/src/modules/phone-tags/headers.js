import messages from "../../messages";

//"标签种类", "商品名称", "认证型号", "包装内含", "执行标准", "CMIIT ID", "进网许可证", "产品名称", "颜色", "存储空间", "生产日期", "商标", "制造商", "制造商地址"
let codes = [
    'templateId', 'goodsName',
    'modelCode', 'packageContent', 'standard', 'cmiitId',
    'networkLicense', 'productName', 'colour', 'storage',
    'productDate', 'brand', 'manufacturer', 'manufacturerAddress'
];

export const converter = (fields, codes) => {
    return codes.map(item => fields[item]);
}

export const Headers = {
    code: codes,
    name: converter(messages.resources["phone-tags"].fields, codes)
};

export default Headers;
