import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from "react-admin";

function pageParams(params) {
    return {
        ...params.filter,
        page: params.pagination.page - 1,
        size: params.pagination.perPage,
        sort: `${params.sort.field},${params.sort.order}`
    };
}

function pageFormat(response) {
    return {
        data: response.json.content,
        total: parseInt(response.json.totalElements, 10)
    };
}

function writeFormatFactory(params) {
    return function (response) {
        let data = response.json;
        if (typeof data === 'object') return data;
        return {
            data: {...params},
        };
    }
}

const pickQuery = params => {
    let query = {};
    if (params.query) query = {...params.query};
    if (params.data && params.data._query) {
        query = {...query, ...params.data._query};
        delete params.data._query;
    }
    return Object.keys(query).length === 0 ? null : query;
}

/**
 * Maps react-admin queries to a REST API implemented using Spring Rest
 *
 * @example
 * GET_LIST             => GET http://my.api.url/posts?keyword=&page=0&size=10&sort=id,asc
 * GET_ONE              => GET http://my.api.url/posts/123
 * GET_MANY             => GET http://my.api.url/posts?id=1234&id=5678
 * GET_MANY_REFERENCE   => GET http://my.api.url/comments?postId=&page=0&size=10&sort=id,asc
 * CREATE               => POST http://my.api.url/posts
 * UPDATE               => PUT http://my.api.url/posts/123
 * UPDATE_MANY          => multiple call UPDATE
 * DELETE               => DELETE http://my.api.url/posts/123
 * DELETE_MANY          => multiple call DELETE
 */
export default (apiUrl, httpClient = fetch) => {
    let dataProvider = (type, resource, params) => {
        let url = `${apiUrl}/${resource}`,
            options = {},
            format = response => ({data: response.json});
        switch (type) {
            case GET_LIST:
                options.method = 'GET';
                options.params = pageParams(params);
                options.params = {...options.params, ...params.query};
                format = pageFormat;
                break;
            case GET_ONE:
                options.method = 'GET';
                options.params = params.query;
                url += `/${params.id}`;
                break;
            case GET_MANY:
                options.method = 'GET';
                options.params = {id: params.ids, ...params.query};
                break;
            case GET_MANY_REFERENCE:
                options.method = 'GET';
                options.params = pageParams(params);
                options.params[params.target] = params.id;
                options.params = {...options.params, ...params.query};
                format = pageFormat;
                break;
            case CREATE:
                options.method = 'POST';
                options.params = pickQuery(params);
                options.body = params.data;
                //support non-standard response
                format = response => {
                    let data = response.json || response.body;
                    console.info("create.data:", response);
                    //TODO 完善代码，后台没有返回对象的场景
                    if (typeof data === 'string') data = {data: data};
                    if (!data.id) data.id = 0;
                    return {data: data};
                };
                break;
            case UPDATE:
                url += `/${params.id}`;
                options.method = 'PUT';
                options.params = pickQuery(params);
                options.body = params.data;
                //support non-standard response
                format = writeFormatFactory(params.data);
                break;
            case UPDATE_MANY:
                //multiple call UPDATE
                return Promise.all(params.ids.map(id => dataProvider(UPDATE, resource, {id, ...params})))
                    .then(response => ({data: response.map(item => item.data)}));
            case DELETE:
                url += `/${params.id}`;
                options.params = params.query;
                options.method = 'DELETE';
                break;
            case DELETE_MANY:
                //multiple call DELETE
                return Promise.all(params.ids.map(id => dataProvider(DELETE, resource, {id})))
                    .then(response => ({data: response.map(item => item.data)}));
            default:
                throw new Error(`unknown type [${type}]`);
        }

        if (options.body instanceof FormData) {
            let query = options.body.get("_query");
            query && (options.params = JSON.parse(query));
            options.body.delete("_query");
        }

        return httpClient(url, options).then(format);
    };
    return dataProvider;
};
