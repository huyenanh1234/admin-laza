import baseAdminAxios from "../../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../../helpers/common";
const baseRoute = 'profile/'

const profileApis = {
    show: () => {
        return baseAdminAxios.get(baseRoute, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (data) => {
        return baseAdminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
};

export default profileApis;