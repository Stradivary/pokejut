import { type AxiosRequestConfig } from "axios";
export interface IBaseRemoteDataSource<T> {
    getAll(params: AxiosRequestConfig<Array<T>>): Promise<Array<T>>;
    getOne(id: string, params: AxiosRequestConfig<T>): Promise<T>;
}
