import { Avatar, TextField } from "@mui/material";
import { useState } from "react";
import { getUserDetails, setUserDetails } from "../../services/user.service";
import './profile.scss';

export function Profile() {

    setUserDetails({
        first_name: 'Sai Kiran',
        last_name: 'Jella',
        email: 'jsaikiran19@gmail.com',
        phone: '8123698251'
    })



    const userDetails = getUserDetails();
    const [first_name, setFirstName] = useState(userDetails.first_name);
    const [last_name, setLastName] = useState(userDetails.last_name);
    const [email, setEmail] = useState(userDetails.email);
    const [phone, setPhone] = useState(userDetails.phone);

    return (
        <div className="user-profile-container">
            {/* <Navbar></Navbar> */}
            {userDetails && <div className="user-profile-form">
                <Avatar sx={{ width: 75, height: 75 }}></Avatar>
                <p>Update Photo</p>
                <div className="text-inputs">
                    <div className="row">
                        <TextField className="input-field" label="First Name" size="medium" variant='outlined' placeholder='First Name' onChange={(e:any)=>setFirstName(e.target.value)} value={first_name}></TextField>
                        <TextField className="input-field" label="Last Name" size="medium" variant='outlined' placeholder='Last Name' onChange={(e:any)=>setLastName(e.target.value)} value={last_name}></TextField>
                    </div>
                    <div className="row">
                        <TextField className="input-field" label="Email" size="medium" variant="outlined" placeholder="Email" onChange={(e:any)=>setEmail(e.target.value)} value={email}></TextField>
                        <TextField className="input-field" label="Phone" size="medium" variant="outlined" placeholder="Phone" onChange={(e:any)=>setPhone(e.target.value)} value={phone}></TextField>
                    </div>
                </div>
            </div>}

        </div>
    )
}