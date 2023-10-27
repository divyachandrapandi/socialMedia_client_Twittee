import axios from 'axios';


const API= axios.create({baseURL : process.env.REACT_APP_API_URL});


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req
  });


export const getUser = (userId) => API.post(`/user/${userId}`)
export const updateUser = (userId, formData) => API.put(`/user/${userId}`, formData)
export const getAllUser = () => API.get(`/user`)
export const followUser = (id,data) => API.put(`/user/${id}/follow`, data)
export const unFollowUser = (id,data) => API.put(`/user/${id}/unfollow`, data)