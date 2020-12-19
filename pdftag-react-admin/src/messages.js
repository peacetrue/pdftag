export default {
    Forbidden: "没有操作权限",
    ra: {
        page: {
            dashboard: '帮助',
            create: '新建 %{name}',
            edit: '编辑 %{name} ',
            empty: '无 %{name} ',
            error: '出现错误',
            invite: '要增加吗?',
            list: '%{name} 列表',
            loading: '加载中',
            not_found: '未发现',
            show: '%{name} 详情',
        },
        message: {
            about: '关于',
            are_you_sure: '您确定操作?',
            bulk_delete_content:
                '删除操作不可恢复，是否确认删除？',
            bulk_delete_title:
                '删除 %{name}',
            delete_content: '删除操作不可恢复，是否确认删除？?',
            delete_title: '删除 %{name}',
            error:
                "客户端错误导致请求未完成.",
            invalid_form: '表单输入无效. 请检查错误提示',
            loading: '正在加载页面, 请稍候',
            no: '否',
            not_found:
                '您输入了错误的URL或者错误的链接.',
            unsaved_changes:
                "修改未保存. 放弃修改吗?",
            yes: '是',
            'Failed to fetch': '无法请求服务器资源'
        }
    },
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
            name: '配置',
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
                templateId: '标签种类',
                goodsName: '商品名称',
                modelCode: '认证型号',
                packageContent: '包装内含',
                standard: '执行标准',
                cmiitId: 'CMIIT ID',
                networkLicense: '进网许可证',
                productName: '产品名称',
                colour: '颜色',
                storage: '存储空间',
                productDate: '生产日期',
                brand: '商标',
                manufacturer: '制造商',
                manufacturerAddress: '制造商地址',
            },
        },
    }
}
