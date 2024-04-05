import { IBaseRemoteDataSource } from "./IBaseRemoteDataSource";
import { get } from "@/utils/fetch";
import { AxiosRequestConfig } from "axios";


export class BaseRemoteDataSource<T, P = AxiosRequestConfig> implements IBaseRemoteDataSource<T, P> {

    public baseUrl = 'https://pokeapi.co/api/v2/';

    private entity: string;

    constructor(entity: string) {
        this.entity = entity;
    }

    async getAll(params?: AxiosRequestConfig<Array<T>>) {
        return get(this.baseUrl + this.entity, params) as Promise<Array<T>>;
    }
    async getOne(id: string, params?: AxiosRequestConfig<any>) {
        return get(this.baseUrl + this.entity + '/' + id, params) as Promise<T>;
    }
}
