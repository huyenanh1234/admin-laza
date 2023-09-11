import baseAdminAxios from "../../plugins/axios";
import {getHeaderWithAuthorizationBearerToken} from "../../helpers/common";
import { PAGINATION } from "../../helpers/constants";
const baseRoute = 'classifies/'

const productApis = {
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
    destroy: (productId) => {
        return baseAdminAxios.delete(baseRoute + productId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    store: (data) => {
        return baseAdminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (productId) => {
        return baseAdminAxios.get(baseRoute + productId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (productId, data) => {
        return baseAdminAxios.put(baseRoute + productId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
};

export default productApis;