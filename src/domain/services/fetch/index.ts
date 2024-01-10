
import axios from "axios";

export const get = async (url: string) => {
    const res = await axios.get(url);
    return res.data;
};

export const post = async (url: string, payload: unknown) => {
    const res = await axios.post(url, payload);
    return res.data;
};

export const put = async (url: string, payload: unknown) => {
    const res = await axios.put(url, payload);
    return res.data;
};

export const patch = async (url: string, payload: unknown) => {
    const res = await axios.patch(url, payload);
    return res.data;
}

export const del = async (url: string) => {
    const res = await axios.delete(url);
    return res.data;
};


