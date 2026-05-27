import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: `https://assignment-12-server-lac-one.vercel.app`
    baseURL: `http://localhost:5000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;