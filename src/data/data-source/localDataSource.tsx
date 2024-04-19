import { DataSource } from "./DataSource";

class LocalDataSource<T> implements DataSource<T> {
    private data: T;
    public url: string;
    public path: string;

    constructor(url, path, data = {} as T) {
        this.url = url;
        this.path = path;
        this.data = data;
    }
    
    getAll(params?: any): Promise<T> {
        console.log(params);
        return Promise.resolve(this.data);
    }
    getById(id: string, params?: any): Promise<T> {
        console.log(params);
        return Promise.resolve(this.data[id]);
    }

    public async initialize(): Promise<void> {
        try {
            const jsonPokemons = await import(`../raw-data/${this.url}.json`);
            this.data = jsonPokemons[this.path];
        } catch (error) {
            console.error(error);
        }
    }

}

export { LocalDataSource };
