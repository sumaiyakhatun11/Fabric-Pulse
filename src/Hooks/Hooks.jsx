import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://febricpulse.vercel.app',

});

const useAxios = () => {
    return axiosInstance;
}
export default useAxios;