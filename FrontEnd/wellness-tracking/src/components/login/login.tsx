import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Radio } from "@mui/material";
import GoogleButton from 'react-google-button';
import './login.scss';

export function Login() {
    const [role, setRole] = useState('customer');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    function handleUserName(e: any) {
        setUserName(e.target.value);
    }

    function handlePassword(e: any) {
        setPassword(e.target.value);
    }

    function submitForm(e: any) {
        e.preventDefault();
        setUserNameError(!userName ? 'Username cannot be empty' : '');
        setPasswordError(!password ? 'Password cannot be empty' : '');
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
                        <TextField size="small" type="email" helperText={userNameError} error={!!userNameError} className="input-text" onChange={handleUserName} id="outlined-basic" label="Username" variant="outlined" />
                        <TextField size="small" error={!!passwordError} helperText={passwordError} type="password" onChange={handlePassword} className="input-text" id="outlined-basic-password" label="Password" variant="outlined"></TextField>
                        <Button size="small" type="submit" className="input-text" variant="contained">Sign In</Button>
                        <p className="forgot" onClick={forgotPassoword}>Forgot Password?</p>
                        <div className="social-media-login">
                            <GoogleButton style={{ width: '260px' }} onClick={() => { console.log('clicked') }}></GoogleButton>
                            <p>Or</p>
                            <button className="loginBtn loginBtn--facebook">
                                Continue with Facebook
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}