import React from "react";
import "./navbar.scss";
import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { userDetails$ } from "../../services/user.service";
import { Subscription } from "rxjs";

function Navbar() {

    const [avatarChar, setAvatarChar] = useState('')

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
                    <ul className="navbar-items">
                        <li className="navbar-item">Workouts</li>
                        <li className="navbar-item">Programs</li>
                        <li className="navbar-item">Healthy Living</li>
                        <li className="navbar-item">Healthy</li>
                        <li className="navbar-item">About</li>
                        <li className="navbar-item">Store</li>
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
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </nav>
    );
}

export default Navbar;