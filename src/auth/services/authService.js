import {
      validateUsername,
      validateEmail,
      validatePassword,
} from '../utils/validator'


export const login = (username, email, password) => {
    if(
        validateUsername(username) &&
        validateEmail(email) &&
        validatePassword(password) &&
        username === localStorage.getItem('username') &&
        email === localStorage.getItem('email') && 
        password === localStorage.getItem('password')){
        const token = 'fake-token';
        localStorage.setItem('Token', token);
        return true;
    }
    return false;
};

export const register = (username, email, password) => {
    if(validateUsername(username) &&
        validateEmail(email) &&
        validatePassword(password)){
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.clear();
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('Token');
};