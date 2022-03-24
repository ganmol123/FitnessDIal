import React from "react";
import "./navbar.scss";
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function Navbar(props:any) {
    const [tabIndex, setTabIndex] = useState({tab:0,child:0});
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const tabs = props.tabs;
    const navigate = useNavigate();
    
    return (
        <ProSidebar onToggle={(e) => console.log(e)}>
                <Menu iconShape="square">
                    <SidebarHeader>
                        <div className="fitness-dial-logo">
                            {/* <img src={logo} alt="logo" height="100" width="100" /> */}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        {tabs.map((tab: any, i: number) => {
                            return !tab.children ? (<MenuItem onClick={() => {setTabIndex({tab:i,child:0}); navigate(tab.route); setSubMenuOpen(false)}} className={`navbar-item` + (i === tabIndex.tab ? ` --selected` : '')}>{tab.name}</MenuItem>) :
                            (<SubMenu open={subMenuOpen} title={tab.name} onClick={()=>setSubMenuOpen(!subMenuOpen)}>
                            {tab.children.map((child:any,j:number)=><MenuItem onClick={() =>{ setTabIndex({tab:i,child:j}); navigate(child.route) }} className={`navbar-item` + (i === tabIndex.tab && j === tabIndex.child ? ` --selected` : '')}>{child.name}</MenuItem>)}
                        </SubMenu>)
                        })}
                        
                    </SidebarContent>
                    <SidebarFooter>

                    </SidebarFooter>
                </Menu>
            </ProSidebar>
    );
}

export default Navbar;