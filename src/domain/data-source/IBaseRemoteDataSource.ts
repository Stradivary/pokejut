import { AxiosRequestConfig } from "axios";


export interface IBaseRemoteDataSource {
    getAll(params: AxiosRequestConfig<any>): Promise<void>;
    getOne(id: string, params: AxiosRequestConfig<any>): Promise<void>;
}
