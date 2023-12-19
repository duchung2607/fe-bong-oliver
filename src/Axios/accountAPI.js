import axios from "axios";
import axiosHandle from "./axiosHandle";

export const forgotPassword = (email) => {
    return axiosHandle.get(`https://localhost:7125/api/auth/forgot?email=${email}`);
}

export const checkPass = (pass) => {
    return axiosHandle.post(`https://localhost:7125/api/my/checkpass?pass=${pass}`);
}

export const paymentWithWalet = (bookingId) => {
    return axiosHandle.post(`https://localhost:7125/api/my/paywalet?bookingId=${bookingId}`);
}