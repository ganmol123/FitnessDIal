import React from "react";
import "./navbar.scss";
import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { userDetails$ } from "../../services/user.service";
import { Subscription } from "rxjs";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/fitness-dial-logo.jpeg';

function Navbar(props:any) {
    const tabs = props.tabs || ['Dashboard', 'Clients','Messages','Notifications'];
    const [avatarChar, setAvatarChar] = useState('S')

    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const subscriptions: Subscription[] = []

        const sub = userDetails$.subscribe((user: any) => setAvatarChar(user.first_name[0]))
        subscriptions.push(sub);
        return () => {
            subscriptions.forEach(sub => sub.unsubscribe());
        };
    }, []);

    return (
        <nav>

            <div className="left-pane">
                <div className="fitness-dial-logo">
                <img src={logo} alt="logo" height="80" width="80"/>
                </div>
                <ul className="navbar-items">
                    {tabs.map(
                        (tab:string,i:number)=><li key={tab} onClick={(e)=>setTabIndex(i)} className={`navbar-item`+(i===tabIndex ? ` --selected`:'')}>{tab}</li>
                    )}
                </ul>
            </div>



            <div className="right-pane">
                <Avatar
                    className="usericon"
                    id="basic-avatar"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    {avatarChar}
                </Avatar>
                <Menu
                    className="menuclass"
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-avatar",
                    }}
                >
                    <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </nav>
    );
}

export default Navbar;