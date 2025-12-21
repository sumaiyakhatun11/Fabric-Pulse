import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    const token = await user.getIdToken(); // 🔥 must use getIdToken
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error("Axios Error:", error.response?.data || error.message);
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user]);

    return axiosSecure;
};

export default useAxiosSecure;
