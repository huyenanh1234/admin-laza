// import {useForm} from "react-hook-form";
// import authApis from "../../api/baseAdmin/auth";
// import {useNavigate, useSearchParams} from "react-router-dom";
// import {useEffect} from "react";
// import {toast} from "react-toastify";

export default function ChangePassword() {
    

    return (
        <>
            <h2 className={"text-center"}>Thay đổi mật khẩu</h2>
            <form className={"pb-3"}>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Mật khẩu mới</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        // {s
                        //     // ...register('password', {
                        //     //     required: 'Mật khẩu không được để trống',
                        //     //     maxLength: {
                        //     //         value: 20,
                        //     //         message: "Mật khẩu không được lớn hơn 20 ký tự"
                        //     //     },
                        //     //     minLength: {
                        //     //         value: 6,
                        //     //         message: "Mật khẩu không được ít hơn 6 ký tự"
                        //     //     }
                        //     // })
                        // }
                    />
                    {/* {errors.password && <p className={'text-danger fw-bold'}>{errors.password.message}</p>}*/}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        // {
                        //     // ...register('confirm_password', {
                        //     //     required: 'Mật khẩu không được để trống',
                        //     //     maxLength: {
                        //     //         value: 20,
                        //     //         message: "Mật khẩu không được lớn hơn 20 ký tự"
                        //     //     },
                        //     //     minLength: {
                        //     //         value: 6,
                        //     //         message: "Mật khẩu không được ít hơn 6 ký tự"
                        //     //     },
                        //     //     validate: (val) => {
                        //     //         if (watch('password') !== val) {
                        //     //             return "Nhập lại mật khẩu không chính xác";
                        //     //         }
                        //     //     },
                        //     // })
                        // }
                    />
                    {/* {errors.confirm_password && <p className={'text-danger fw-bold'}>{errors.confirm_password.message}</p>} */}
                </div>
                <div className={'text-center'}>
                    <button type="submit" className="btn btn-success">Lưu</button>
                </div>
            </form>
        </>
    );
}