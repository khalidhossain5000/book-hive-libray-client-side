"use client";
import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (!user) return config;

        try {
          const token = await user.getIdToken?.();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error("Failed to fetch Firebase auth token", error);
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          if (typeof logOut === "function") {
            await logOut();
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);
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
