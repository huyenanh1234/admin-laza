// import {useCookies} from "react-cookie";
import {Outlet, useNavigate} from "react-router-dom";
// import {useEffect} from "react";

export default function AuthLayout() {
    

    return (
        <>
            <div className={'container-fluid row login-page justify-content-center align-items-center'}>
                <div className="card login-content p-0 bg-light">
                    <div className="card-body">
                        <div className={'text-center'}>
                            <img src="/images/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image image-circle elevation-3"/>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}