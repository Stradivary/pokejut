import { IBaseRemoteDataSource } from "./IBaseRemoteDataSource";
import { get } from "@/utils/fetch";
import { AxiosRequestConfig } from "axios";

export class BaseRemoteDataSource<T> implements IBaseRemoteDataSource<T> {

    public baseUrl = 'https://pokeapi.co/api/v2/';

    private entity: string;

    constructor(entity: string) {
        this.entity = entity;
    }

    async getAll(params?: AxiosRequestConfig<Array<T>>): Promise<Array<T>> {
        return get(this.baseUrl + this.entity, params) as Promise<Array<T>>;
    }
    async getOne(id: string, params?: AxiosRequestConfig<any>): Promise<T> {
        return get(this.baseUrl + this.entity + '/' + id, params) as Promise<T>;
    }
}
