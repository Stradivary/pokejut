// Local and Remote data source base interface for crud operations
export interface DataSource<T> {
    url: string;
    path: string;
    initialize(): Promise<void>;
    getAll(params?: any): Promise<T>;
    getById(id: string, params?: any): Promise<T>;
}


