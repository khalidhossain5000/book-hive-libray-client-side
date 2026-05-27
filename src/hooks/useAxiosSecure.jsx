import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import Loading from '../Pages/Shared/Loading/Loading';
const axiosSecure = axios.create({
    baseURL:`https://assignment-12-server-lac-one.vercel.app`
    // baseURL:`http://localhost:3000`
})
const useAxiosSecure = () => {
    const { user,logOut } = useAuth();
   
    
    const navigate = useNavigate();
    if(!user?.accessToken) return <Loading/>
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error?.response?.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })
    return axiosSecure
};

export default useAxiosSecure;