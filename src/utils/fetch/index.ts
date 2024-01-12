
import axios, { AxiosRequestConfig } from "axios";

export const get = async (url: string, config?: AxiosRequestConfig<any>) => {
    const res = await axios.get(url, config);
    return res.data;
};
