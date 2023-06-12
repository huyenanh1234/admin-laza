import MainSidebar from "../components/_common/mainSidebar/mainSidebar"
import Navigation from "../components/_common/navigation/navigation"
import Footer from "../components/_common/footer/footer"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function Layout(){

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