import axios from "axios";
import axiosHandle from "./axiosHandle";

export const getHairStylesByTypeHair = () => {
    return axiosHandle.get(`https://localhost:7125/api/hair?page=1&pageSize=1000`)
}

export const getHairStylesById = (id) => {
    return axiosHandle.get(`https://localhost:7125/api/hair/${id}`)
}