import MainSidebar from "../components/_common/mainSidebar/mainSidebar"
import Navigation from "../components/_common/navigation/navigation"
import Footer from "../components/_common/footer/footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { useCookies } from "react-cookie"
import { useEffect } from "react"
import profileApis from "../api/baseAdmin/profile"
import { createAuthUser } from "../features/auth/authSlice"


export default function Layout(){
    const auth = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [cookie, setCookie] = useCookies(["user_token"])

    useEffect(()=>{
        if(!auth.user){
            (
                async()=>{
                    const profileRes = await profileApis.show();
                    if(profileRes.success){
                        dispatch(createAuthUser(profileRes.data));
                    }
                }
            )()
        }
    },[cookie])

    return (
        <>
            <div id="main" className="sidebar-mini layout-fixed">
                <div className="wrapper container-fluid p-0"> 
                    <Navigation/>
                    <MainSidebar/>
                    <div className="content-wrapper">
                        <Outlet />
                    </div>
                    <Footer/>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ width: "400px" }}
            />
        </>
    )
}