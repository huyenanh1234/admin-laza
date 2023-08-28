import { createSlice } from "@reduxjs/toolkit";
import {generateFileToUrl} from "../../helpers/common";
//khai bao cac info lien quan toi chuc nang nhu Initial Statage, action, 
//reducer: ham thuc hien cac hanh dong co the xay ra, liên kết state và action
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        createAuthUser: (state, action) => { //khi truyền tham số vào chính là truyền payload của action
            const user = action.payload;
            let avatar = user.avatar;

            try {
                avatar = JSON.parse(user.avatar)

                if (typeof avatar === 'object') {
                    avatar = generateFileToUrl(avatar.value.data)
                }
            } catch (e) {
                avatar = user.avatar;
            }
            console.log(avatar);
            return Object.assign({}, state, {
                user: {...user, avatarUrl: avatar},
            });
            // cách khác
            // return {
            //     ...state,
            //     user:{...user, avatarUrl:avata}
            // }

        },
        updateAuthUser: (state, action) => {
            const user = action.payload;
            let avatar = user.avatar;

            try {
                avatar = JSON.parse(user.avatar)

                if (typeof avatar === 'object') {
                    avatar = generateFileToUrl(avatar.value.data)
                }
            } catch (e) {
                avatar = user.avatar;
            }

            return Object.assign({}, state, {
                user: {...user, avatarUrl: avatar},
            });
        },
    }
});

export const { createAuthUser, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;