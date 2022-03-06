import  { Routes, Route, Router, Navigate } from 'react-router-dom';
import { Login } from "../../components/login/login";
import logo from "../../assets/yoga-image.jpeg";
import { Signup } from '../../components/signup/signup';
import './landing-page.scss';

export function LandingPage() {
    return (
        <div className="wellness-tracking-landing-page">
            <div className="landing-page-container">
            <div className="landing-page-header">
                <div className="fitness-dial-logo">

                </div>
                <div className="navbar-container">
                    <ul className="navbar">
                        <li className="navbar-item">Workouts</li>
                        <li className="navbar-item">Programs</li>
                        <li className="navbar-item">Healthy Living</li>
                        <li className="navbar-item">Community</li>
                        <li className="navbar-item">About</li>  
                        <li className="navbar-item">Store</li>
                    </ul>
                </div>
                <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>  
            <div className="landing-page-body">
                <div className="landing-page-left-pane">
                    { <Login></Login>}
                     
                     {/* <img src={logo} alt="logo" width="200" height="200"/> */}
                </div>
                <div className="landing-page-right-pane">
                    <div className="heading">
                       <div className="join-free-text">
                       JOIN FREE
                       </div>
                       <div className="signup-description">
                           Reach your fitness goals or maintain your healthy lifestyle with professional training and support from  a positive and active online community - for free.
                       </div>
                    </div>
                    <Signup></Signup>
               
                </div>
            </div>
            </div>
        </div>
    )
}