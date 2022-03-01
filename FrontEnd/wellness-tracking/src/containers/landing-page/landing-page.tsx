import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from "../../components/login/login";
import logo from '../../assets/fitness-dial-logo.jpeg';
import { CreatePassword } from '../../components/create-password/create-password';
import { Signup } from '../../components/signup/signup';
import './landing-page.scss';

export function LandingPage() {
    return (
        <div className="wellness-tracking-landing-page">
            <div className="landing-page-container">
                <div className="landing-page-header">
                    <div className="logo-container">
                        <img src={logo} alt="logo" height="100" width="100" />
                    </div>
                </div>
                <div className="landing-page-body">
                    <div className="landing-page-left-pane">
                    </div>
                    <div className="landing-page-right-pane">
                        <Routes>
                            <Route path='/' element={<Navigate to="/login"></Navigate>}>
                            </Route>
                            <Route path='/login' element={<Login></Login>}></Route>
                            <Route path='/register' element={<Signup></Signup>}></Route>
                            <Route path='/createPassword/' element={<CreatePassword></CreatePassword>}></Route>
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    )
}