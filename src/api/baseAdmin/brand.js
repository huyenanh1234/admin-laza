import baseAdminAxios from "../../plugins/axios";
import {getHeaderWithAuthorizationBearerToken} from "../../helpers/common";
import { PAGINATION } from "../../helpers/constants";
const baseRoute = 'brands/'

const brandApis = {
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
    destroy: (brandId) => {
        return baseAdminAxios.delete(baseRoute + brandId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    store: (data) => {
        return baseAdminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (brandId) => {
        return baseAdminAxios.get(baseRoute + brandId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (brandId, data) => {
        return baseAdminAxios.put(baseRoute + brandId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
};

export default brandApis;