import axios from "axios";
import axiosHandle from "./axiosHandle";

export const verifyEmail = (email, token) => {
    return axiosHandle.post(`https://localhost:7125/api/auth/verify?email=${email}&token=${token}`);
}