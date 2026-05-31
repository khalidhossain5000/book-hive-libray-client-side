import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: `process.env.PRODUCTION_URL`
    baseURL: `http://localhost:5000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;