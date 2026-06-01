"use client";
import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import GlobalLoading from "@/components/shared/GlobalLoading";

const axiosSecure = axios.create({
  // baseURL: `http://localhost:5000`,
   baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  if (!user?.accessToken) return <GlobalLoading />;
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error?.response?.status;
      if (status === 403) {
        // navigate('/forbidden');
      } else if (status === 401) {
        // logOut()
        // .then(() => {
        //     navigate('/login')
        // })
        // .catch(() => { })
      }

      return Promise.reject(error);
    },
  );
  return axiosSecure;
};

export default useAxiosSecure;
