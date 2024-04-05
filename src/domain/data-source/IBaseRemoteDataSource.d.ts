import { type AxiosRequestConfig } from "axios";
export interface IBaseRemoteDataSource<T, P = Any> {
    getAll(params: P<Array<T>>): Promise<Array<T>>;
    getOne(id: string, params: P<T>): Promise<T>;
}
