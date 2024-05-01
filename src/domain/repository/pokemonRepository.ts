import { DataSource } from "@/data/data-source/DataSource";
import { LocalDataSource } from "@/data/data-source/localDataSource";

interface Pokemon {
    id: number;
    name: string;
    types: string[];
}

interface PaginationOptions {
    page: number;
    pageSize: number;
    q?: string; // General search query
    filter?: string; // Filter by type
}

const getPages = <T>(data: T[], pageSize: number) => {
    const pages: T[][] = [];
    for (let i = 0; i < data.length; i += pageSize) {
        pages.push(data.slice(i, i + pageSize));
    }
    return pages;
};

export class PokemonRepository {
    private pokemons: Pokemon[] = [];
    private pokemonsByPage: Pokemon[][] = [];
    private dataSource: DataSource<Pokemon[]>;
    private isLoaded = false;

    constructor(dataSource: DataSource<Pokemon[]>) {
        // run async function to get data
        this.dataSource = dataSource;
        this.initDataSource();
    }

    async initDataSource() {
        await this.dataSource.initialize();
        this.isLoaded = true;
    }

    async getPokemonsByPage(options: Partial<PaginationOptions> & { page: number; }): Promise<{
        results: Pokemon[];
        meta: {
            nextPage: number;
            hasNextPage: boolean;
            totalPage: number;
        };
    }> {

        const { page, pageSize = 10, q, filter } = options;

        if (!this.isLoaded) {
            await new Promise((resolve) => setTimeout(resolve, 3500));
        }

        if (this.pokemons.length === 0) {
            this.pokemons = await this.dataSource.getAll();
        }

        let filteredPokemons = this.pokemons;

        if (q !== undefined && q !== "") {
            filteredPokemons = this.pokemons
                .filter(pokemon =>
                    pokemon.name
                        .toLowerCase()
                        .includes(q.toLowerCase())
                );
        }

        if (filter !== undefined && filter !== "") {
            filteredPokemons = filteredPokemons
                .filter((pokemon) => pokemon.types instanceof Array)
                .filter(pokemon =>
                    pokemon.types.includes(filter)
                );
        }


        this.pokemonsByPage = getPages<Pokemon>(filteredPokemons, pageSize);
        return {
            results: this.pokemonsByPage[page],
            meta: {
                nextPage: page + 1,
                hasNextPage: page + 1 < this.pokemonsByPage.length,
                totalPage: this.pokemonsByPage.length
            }
        };

    }
}

export const pokemonInternalRepo = new PokemonRepository(
    new LocalDataSource<Pokemon[]>(
        "pokemon_list", "pokemons",
        []
    )
);
