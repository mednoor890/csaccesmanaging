import React, {useState} from "react";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.css';
export const  Sidebar=()=>{
    const [sidebar, setSidebar] = useState(false);
    const [show,setShow]=useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const SidebarData = [
        {
            title: 'Clients',
            path: '/',
            cName: 'nav-text'
        },
        {

            title: 'Domains',
            path: '/domains',
            cName: 'nav-text'
        },
        {
            title: ' Site',
            path: '/site',
            cName: 'nav-text'
        },
        {
            title: 'Data Base',
            path: '/database',
            cName: 'nav-text'
        },
        {title:' FTP',
            path:'/ftp',
            cName: 'nav-text'},
    ];

    return (
        <>
            <IconContext.Provider value={{ color: 'black' }}>
                <div className='navbar'>

                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />

                    </Link>


                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}  >
                                    <Link to={item.path}>

                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

            </IconContext.Provider>
        </>)
}