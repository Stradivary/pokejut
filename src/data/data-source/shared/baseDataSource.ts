import { get } from "@/utils/fetch";
import { AxiosRequestConfig } from "axios";
import { IBaseRemoteDataSource } from "../../../domain/repository/IBaseRemoteDataSource";

export class BaseRemoteDataSource implements IBaseRemoteDataSource {

    public baseUrl = 'https://pokeapi.co/api/v2/';

    private entity: string;

    constructor(entity: string) {
        this.entity = entity;
    }

    async getAll(params?: AxiosRequestConfig<any>): Promise<any> {
        return get(this.baseUrl + this.entity, params);
    }
    async getOne(id: string, params?: AxiosRequestConfig<any>): Promise<any> {
        return get(this.baseUrl + this.entity + '/' + id, params);
    }
}
