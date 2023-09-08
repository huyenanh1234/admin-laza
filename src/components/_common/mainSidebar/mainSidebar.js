import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import profileApis from '../../../api/baseAdmin/profile';
import { generateFileToUrl } from '../../../helpers/common';
import { useSelector} from 'react-redux';


export default function MainSidebar(){
    
    const auth = useSelector(state=>state.auth)
    
    useEffect(()=>{
        document.querySelectorAll(".main-sidebar .nav-sidebar > .nav-item").forEach((i)=>{
            document.querySelector(".nav-link").addEventListener("click", (e)=>{
                e.preventDefault();
                if (i.classList.contains('menu-is-opening') && i.classList.contains('menu-open')){
                    i.classList.remove("menu-is-opening");
                    i.classList.remove("menu-open");
                }
                else {
                    i.classList.add("menu-is-opening");
                    i.classList.add("menu-open");
                }
            })
        })
    
    },[])

    return (
        <>
            <div className="main-sidebar sidebar-dark-primary">
                <a href="http://localhost:3000/" className="brand-link">
                    <img src="/images/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image image-circle elevation-3"/>
                    <span className="brand-text fw-light">Base Admin</span>
                </a>
                <div className="sidebar">
                    <div className="sidebar-content">
                        {/* Sidebar User Panel */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src={auth.user?.avatarUrl} className="img-circle elevation-2" alt="User" />
                            </div>
                            <div className="info">
                                <NavLink
                                    to={'profile'}
                                    className={"nav-link"}
                                    end
                                >
                                    {auth.user?.name}
                                </NavLink>
                                
                            </div>
                        </div>

                        {/* Sidebar menu */}
                        <nav className="mt-2 sidebar-menu">
                            <ul className={"nav nav-pills nav-sidebar flex-column"} data-widget="treeview" role="menu" data-accordion="false">
                                <li className={"nav-item menu-open menu-is-opening"}>
                                    <a href={"http://localhost:3000/"} className={"nav-link active"}>
                                        <FontAwesomeIcon icon={faUsers} className={"nav-icon"} />
                                        <p>
                                            Quản lý Users
                                            <FontAwesomeIcon icon={faAngleLeft} className={"right"}/>
                                        </p>
                                    </a>
                                    <ul className={"nav nav-treeview"}>
                                        <li className={"nav-item"}>
                                            <NavLink
                                                to={'users'}
                                                className={"nav-link"}
                                                end
                                            >
                                                <FontAwesomeIcon icon={faCircle} className={"nav-icon"} />
                                                <p>
                                                    Danh sách Users
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className={"nav-item"}>
                                            <NavLink
                                                to={'users/create'}
                                                className={"nav-link"}
                                                end
                                            >
                                                <FontAwesomeIcon icon={faCircle} className={"nav-icon"} />
                                                <p>
                                                    Thêm mới User
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <a href={"http://localhost:3000/"} className={"nav-link active"}>
                                        <FontAwesomeIcon icon={faUsers} className={"nav-icon"} />
                                        <p>
                                            Quản lý Brands
                                            <FontAwesomeIcon icon={faAngleLeft} className={"right"}/>
                                        </p>
                                    </a>
                                    <ul className={"nav nav-treeview"}>
                                        <li className={"nav-item"}>
                                            <NavLink
                                                to={'brands'}
                                                className={"nav-link"}
                                                end
                                            >
                                                <FontAwesomeIcon icon={faCircle} className={"nav-icon"} />
                                                <p>
                                                    Danh sách Brand
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className={"nav-item"}>
                                            <NavLink
                                                to={'brands/create'}
                                                className={"nav-link"}
                                                end
                                            >
                                                <FontAwesomeIcon icon={faCircle} className={"nav-icon"} />
                                                <p>
                                                    Thêm mới Brand
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}