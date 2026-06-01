import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL
    // baseURL: `http://localhost:5000`
})
console.log(process.env.NEXT_PUBLIC_PRODUCTION_URL,'this is production url here')
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;