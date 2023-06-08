import axios from "axios";
import axiosHandle from "./axiosHandle";

const END_POINT = {
    LOGIN: "login",
    USERS: "users",
    STYLIST: "users/stylist",
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

export const createRate = (createRate) => {
    return axiosHandle.post(
        "https://localhost:7125/api/rate",
        createRate,
        {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data"
        },
    );
}