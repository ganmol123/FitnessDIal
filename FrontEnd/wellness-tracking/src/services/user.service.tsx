import axios from '../axios';



export function setUserDetails(userDetails: any) {
    localStorage.setItem('userDetails',JSON.stringify(userDetails));
}

export function getUserDetails():any {
    return JSON.parse(localStorage.getItem('userDetails')||'');
}

export const signUp = (user: any) => {
    return axios.post('/api/authnew/signup', user);
}

export const login = (username: string, password: string) => {
    return axios.post('/api/auth/login', { username, password });
}

export const forgot = (username: string) => axios.post('/api/authnew/forgot', {
    username
});