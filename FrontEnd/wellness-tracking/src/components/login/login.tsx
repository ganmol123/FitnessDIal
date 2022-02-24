import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Radio } from "@mui/material";
import GoogleButton from 'react-google-button';
import './login.scss';
import axios from '../../axios';
import { useNavigate } from "react-router";

export function Login() {
    const [role, setRole] = useState('customer');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const navigate = useNavigate();


    const loginUser =  async ()=>{
        try {
            await axios.post('/api/auth',{
                username,
                password
            });
            navigate('home');
        }
        catch {
            console.log("Something went wrong");
        }
    }

    function submitForm(e: any) {
        e.preventDefault();
        loginUser()
    }

    const forgotPassoword = () => {
        console.log('forgot password')
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={submitForm}>
                    <div className="login-inputs">
                        <p>Choose customer or professional and enter your Username and password</p>
                        <div className="roles">
                            <label htmlFor="customer">Customer</label>
                            <Radio
                                checked={role === 'customer'}
                                onChange={() => setRole('customer')}
                                value="customer"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <label htmlFor="professional">Professional</label>
                            <Radio
                                checked={role === 'professional'}
                                onChange={() => setRole('professional')}
                                value="professional"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                        </div>
                        <TextField size="small" type="email" required className="input-text" onChange={(e)=>setUserName(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                        <TextField size="small" type="password" required onChange={(e)=>setPassword(e.target.value)} className="input-text" id="outlined-basic-password" label="Password" variant="outlined"></TextField>
                        <Button size="small" type="submit" className="input-text" variant="contained">Sign In</Button>
                        <p className="forgot" onClick={forgotPassoword}>Forgot Password?</p>
                        <div className="social-media-login">
                            <GoogleButton style={{ width: '260px' }} onClick={() => { console.log('clicked') }}></GoogleButton>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}