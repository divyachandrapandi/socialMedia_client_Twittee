import axios from 'axios';
// process.env.REACT_APP_PUBLIC_FOLDER
// local - http://localhost:5000
const API= axios.create({baseURL : process.env.REACT_APP_API_URL});

export const logIn = (formData) => API.post('auth/login',formData)
export const signUp = (formData) => API.post('auth/register',formData)

// /sdfsd