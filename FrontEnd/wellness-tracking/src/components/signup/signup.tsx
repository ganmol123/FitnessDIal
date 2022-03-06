import { Button, Radio, TextField } from "@mui/material";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { useState } from "react";
import './signup.scss';

export function Signup() {
    const [user_type, setUserType] = useState('customer');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');

   
    const submitForm = (e:any)=>{
        e.preventDefault();
    }
    return (
        <div className="signup-container">
            <div className="signup-form">
                <form onSubmit={submitForm}>
                    <div className="signup-inputs">
                        <TextField required size="small" id="first_name_signup" onChange={(e)=>setFirstName(e.target.value)} className="text-input" variant="outlined" label="First Name"></TextField>
                        <TextField required size="small" id="last_name_signup" onChange={e=>setLastName(e.target.value)} className="text-input" variant="outlined" label="Last Name"></TextField>
                        <TextField  required size="small" type="email" id="email_signup" onChange={e=>setEmail(e.target.value)} className="text-input" variant="outlined" label="Email"></TextField>
                        <PhoneInput containerStyle={{margin:"1em"}} onChange={e=>setPhone(e)}></PhoneInput>
                        {/* <TextField size="small" id="phone_number_signup" onChange={e=>setPhone(e.target.value)} type="number" className="text-input" variant="outlined" label="Phone"></TextField> */}
                        <p>Please choose the option that describes you the best:</p>
                        <div className="roles">
                            <label htmlFor="customer">Customer</label>
                            <Radio
                                checked={user_type === 'customer'}
                                onChange={() => setUserType('customer')}
                                value="customer"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <label htmlFor="professional">Professional</label>
                            <Radio
                                checked={user_type === 'professional'}
                                onChange={() => setUserType('professional')}
                                value="professional"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        </div>
                        <Button style={{marginTop:"15px"}} size="small" type="submit" className="input-text" variant="contained">Sign Up</Button>
                    </div>

                </form>
            </div>
        </div>

    )
}