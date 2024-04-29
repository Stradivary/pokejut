
import { DataSource } from "@/data/data-source/DataSource";
import { RemoteDataSource } from "@/data/data-source/remoteDataSource";
import { AxiosRequestConfig } from "axios";

class PokeApiRepository<T, P = AxiosRequestConfig<any>> {

    private dataSource: DataSource<T>;


    constructor(dataSource: DataSource<T>) {
        this.dataSource = dataSource;
    }

    async getAll(params?: P) {
        return this.dataSource.getAll(params);
    }
    async getOne(id: string, params?: AxiosRequestConfig<any>) {
        return this.dataSource.getById(id, params);
    }
}


export class PokeApiEntityRepository<T> extends PokeApiRepository<T> {
    constructor(entity: string) {
        super(new RemoteDataSource<T>(
            'https://pokeapi.co/api/v2/', entity
        ));
    }
}
