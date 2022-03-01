import { ReplaySubject } from 'rxjs';
import axios from '../axios';

const _userDetails$ = new ReplaySubject<any>(1);

export const userDetails$ = _userDetails$.asObservable();


export function setUserDetails(userDetails: any) {
    _userDetails$.next(userDetails);
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