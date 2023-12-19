import axios from "axios";
import axiosHandle from "./axiosHandle";

const END_POINT = {
    LOGIN: "login",
    USERS: "users",
    STYLIST: "users/stylist",
}

export const login = (user) => {
    return axios({
        method: "post",
        url: 'https://localhost:7125/api/auth/login',
        data: user,
        headers: { "Content-Type": "application/json" },
    });
}
export const register = (user) => {
    return axios({
        method: "post",
        url: 'https://localhost:7125/api/auth/register',
        data: user,
        headers: { "Content-Type": "application/json" },
    });
}

export const getMyProfile = () => {
    return axios({
        method: "get",
        url: `https://localhost:7125/api/my`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data"
        },
    });
}

export const getMyHistoryBooking = (username, page, pageSize) => {
    return axios({
        method: "get",
        url: `https://localhost:7125/api/booking/user/${username}?page=${page}&pageSize=${pageSize}&sortBy=create`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
}

export const getBookingByID = (id) => {
    return axios({
        method: "get",
        url: `https://localhost:7125/api/booking/${id}`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
}

export const verifyEmail = () => {
    return axios({
        method: "get",
        url: `https://localhost:7125/api/my/verify`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
    });
}

export const updateProfile = (data) => {
    return axios({
        method: "put",
        url: `https://localhost:7125/api/my/update`,
        data: data,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
    });
}

export const changePassword = (data) => {
    return axios({
        method: "post",
        url: `https://localhost:7125/api/my/change`,
        data: data,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
    });
}

export const payIn = (money) => {
    return axios({
        method: "post",
        url: `https://localhost:7125/api/my/payin?money= ${money}`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
    });
}

export const payMent = (bookingId, total) => {
    return axios({
        method: "post",
        url: `https://localhost:7125/api/VnPay?bookingId=${bookingId}&total= ${total}`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
    });
}

export const checkPayMent = (url) => {
    return axios({
        method: "get",
        url: `https://localhost:7125/api/VnPay${url}`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
}
export const checkPayIn = (url) => {
    return axios({
        method: "get",
        url: `https://localhost:7125/api/VnPay/payin${url}`,
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
        },
    });
}

export const getServices = (page, pageSize, key, sortBy) => {
    return axiosHandle.get('https://localhost:7125/api/service?page=' + page + '&pageSize=' + pageSize + '&key=' + key + '&sortBy=' + sortBy);
}

export const getServiceById = (id) => {
    return axiosHandle.get("https://localhost:7125/api/service/" + id);
}