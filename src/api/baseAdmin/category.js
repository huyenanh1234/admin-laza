import baseAdminAxios from "../../plugins/axios";
import {getHeaderWithAuthorizationBearerToken} from "../../helpers/common";
import { PAGINATION } from "../../helpers/constants";
const baseRoute = 'categories/'

const categoryApis = {
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
    destroy: (categoryId) => {
        return baseAdminAxios.delete(baseRoute + categoryId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    store: (data) => {
        return baseAdminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (categoryId) => {
        return baseAdminAxios.get(baseRoute + categoryId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (categoryId, data) => {
        return baseAdminAxios.put(baseRoute + categoryId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
};

export default categoryApis;