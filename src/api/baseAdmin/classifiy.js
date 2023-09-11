import baseAdminAxios from "../../plugins/axios";
import {getHeaderWithAuthorizationBearerToken} from "../../helpers/common";
import { PAGINATION } from "../../helpers/constants";
const baseRoute = 'classifies/'

const classifyApis = {
    index: (params = {}, page = PAGINATION.startPage, limit = PAGINATION.limit) => {
        return baseAdminAxios.get(baseRoute, { 
            params:{
                ...params,
                    page,
                    limit
            },
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    destroy: (classifyId) => {
        return baseAdminAxios.delete(baseRoute + classifyId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    store: (data) => {
        return baseAdminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (classifyId) => {
        return baseAdminAxios.get(baseRoute + classifyId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (classifyId, data) => {
        return baseAdminAxios.put(baseRoute + classifyId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
};

export default classifyApis;