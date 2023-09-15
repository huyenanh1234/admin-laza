import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { faComments, faBell, faStar } from "@fortawesome/free-regular-svg-icons";
import {useCookies} from "react-cookie";
import {FaBars} from "react-icons/fa"
const Navigation = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const collapseSidebar = (e)=>{
        e.preventDefault();
        if (document.getElementById("main").classList.contains("sidebar-collapse")) {
            document.getElementById("main").classList.remove("sidebar-collapse")
        }
        else document.getElementById("main").classList.add("sidebar-collapse")
    }

    const logout = (e) => {
        e.preventDefault();
        removeCookie('user_token');
        window.location.href = process.env.REACT_APP_APP_DOMAIN + 'login';
    }
    return (
        <>
            <nav className="main-header navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid p-0">
                    <ul className="navbar-nav mb-2 mb-lg-0 mx-3">
                        <li className="nav-item">
                            <a href="http://localhost:3000/" className="nav-link" 
                            onClick={collapseSidebar}
                            >
                                <FaBars></FaBars>
                            </a>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="src/components/_common#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="src/components/_common#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item mx-3 dropdown">
                            <a
                                className="nav-link"
                                href="#"
                                data-toggle={"dropdown"}
                                aria-expanded={"false"}
                                //onClick={(e) => mainHeaderDropdown(e)}
                            >
                                <FontAwesomeIcon icon={faComments} />
                                <span className="badge bg-danger navbar-badge">3</span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                                style={
                                    {
                                        left: 'inherit',
                                        right: '0px'
                                    }
                                }
                            >
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="/images/user1-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 me-3 img-circle"
                                        />
                                            <div className="media-body">
                                                <h3 className="dropdown-item-title">
                                                    Brad Diesel
                                                    <span className="float-right text-sm text-danger">
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>
                                                </h3>
                                                <p className="text-sm">Call me whenever you can...</p>
                                                <p className="text-sm text-muted">
                                                    <i className="far fa-clock mr-1"></i> 4 Hours Ago
                                                </p>
                                            </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                            </div>
                        </li>
                        <li className="nav-item mx-3 dropdown">
                            <a
                                className="nav-link"
                                href="#"
                                data-toggle={"dropdown"}
                                aria-expanded={"false"}
                                //onClick={(e) => mainHeaderDropdown(e)}
                            >
                                <FontAwesomeIcon icon={faBell} />
                                <span className="badge bg-warning navbar-badge">15</span>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                                style={
                                    {
                                        left: 'inherit',
                                        right: '0px'
                                    }
                                }
                            >
                                <span className="dropdown-item dropdown-header">15 Notifications</span>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img
                                            src="/images/user1-128x128.jpg"
                                            alt="User Avatar"
                                            className="img-size-50 me-3 img-circle"
                                        />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Brad Diesel
                                                <span className="float-right text-sm text-danger">
                                                        <FontAwesomeIcon icon={faStar} />
                                                    </span>
                                            </h3>
                                            <p className="text-sm">Call me whenever you can...</p>
                                            <p className="text-sm text-muted">
                                                <i className="far fa-clock mr-1"></i> 4 Hours Ago
                                            </p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#" 
                            //onClick={(e) => handleFullScreen(e)}
                            >
                                <FontAwesomeIcon icon={faExpandArrowsAlt} />
                            </a>
                        </li>
                        <li className={"nav-item max-3"}>
                            <a className="nav-link active text-primary" href="#" 
                            onClick={(e) => logout(e)}
                            >
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
export default Navigation;