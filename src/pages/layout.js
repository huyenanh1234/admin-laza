import MainSidebar from "../components/_common/mainSidebar/mainSidebar"
import Navigation from "../components/_common/navigation/navigation"
import Footer from "../components/_common/footer/footer"
import { Outlet } from "react-router-dom"
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
               
            
        </>
    )
}