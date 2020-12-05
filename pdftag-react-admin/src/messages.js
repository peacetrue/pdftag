export default  {
    Forbidden: "没有操作权限",
    resources: {
        users: {
            name: '用户',
            fields: {
                username: '用户名',
            }
        },
        files: {
            name: '文件',
            fields: {
                name: '名称',
                relativePath: '基础路径',
            },
        },
        attachments: {
            name: '附件',
            fields: {
                name: '名称',
            },
        },
        templates: {
            name: '模版',
            fields: {
                code: '编号',
                name: '名称',
                attachmentId: '附件',
            },
        },
        'phone-tags': {
            name: '标签',
            fields: {
                styleCode: '样式',
                templateId: '模版',
                goodsName: '商品名称',
                modelCode: '认证型号',
                packageContent: '包装内含',
                standard: '执行标准',
                cmiitId: 'CMIIT ID',
                networkLicense: '进网许可证',
                productName: '产品名称',
                colour: '颜色',
                storage: '存储空间',
            },
        },
    }
}
