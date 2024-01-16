import { get } from "@/utils/fetch";
import { AxiosRequestConfig } from "axios";

export interface BaseRemoteDataSource {
    getAll(params: AxiosRequestConfig<any>): Promise<void>;
    getOne(id: string, params: AxiosRequestConfig<any>): Promise<void>;
}
export class BaseRemoteDataSource implements BaseRemoteDataSource {

    public baseUrl = 'https://pokeapi.co/api/v2/';

    private entity: string;

    constructor(entity: string) {
        this.entity = entity;
    }

    async getAll(params: AxiosRequestConfig<any>): Promise<any> {
        return get(this.baseUrl + this.entity, params);
    }
    async getOne(id: string, params: AxiosRequestConfig<any>): Promise<any> {
        return get(this.baseUrl + this.entity + '/' + id, params);
    }
}
