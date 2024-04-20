import { get } from "@/utils/fetch";
import { DataSource } from "./DataSource";

class RemoteDataSource<T> implements DataSource<T> {
    public url: string;
    public path: string;
    private engine: any;

    constructor(url, path = "", engine = get) {
        this.url = url;
        this.path = path;
        this.engine = engine;
    }
    async getAll(params?: any): Promise<T> {
        try {
            const Uri = new URL(this.path, this.url);
            return this.engine(Uri.toString(), params);
        } catch (error) {
            if (error instanceof Error) {
                return Promise.reject(new Error('Get All Error ' + error.message));
            }
        }

        return Promise.reject(new Error('Unknown Error'));
    }

    async getById(id: string, params?: any): Promise<T> {
        try {
            const Uri = new URL(`${this.path}/${id}`, this.url);
            return this.engine(Uri.toString(), params);
        } catch (error) {
            if (error instanceof Error) {
                return Promise.reject(new Error('Get By Id Error ' + error.message));
            }
        }

        return Promise.reject(new Error('Unknown Error'));
    }

    initialize(): Promise<void> {
        return Promise.resolve();
    }

}

export { RemoteDataSource };