import axios from "axios";
import axiosHandle from "./axiosHandle";

export const getServiceMost = (size) => {
    return axiosHandle.get(`https://localhost:7125/api/service/most?size=${size}`);
}