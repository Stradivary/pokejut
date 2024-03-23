
interface Pokemon {
    id: number;
    name: string;
    types: string[];
}

interface PaginationOptions {
    page: number;
    pageSize: number;
    q?: string; // General search query
    filter?: {
        type?: string; // Filter by type
    };
}

const getPages = <T>(data: T[], pageSize: number) => {
    const pages: T[][] = [];
    for (let i = 0; i < data.length; i += pageSize) {
        pages.push(data.slice(i, i + pageSize));
    }
    return pages;
};

class PokemonRepository {
    private pokemons: Pokemon[] = [];
    private pokemonsByPage: Pokemon[][] = [];
    constructor(pokemons: Pokemon[]) {
        this.pokemons = pokemons;
    }

    getAllPokemons(): Pokemon[] {
        return this.pokemons;
    }

    getPokemonsByPage(options: PaginationOptions): {
        results: Pokemon[];
        meta: {
            nextPage: number;
            hasNextPage: boolean;
            totalPage: number;
        };
    } {
        const { page, pageSize, q, filter } = options;

        let filteredPokemons = this.pokemons;
        // Apply general search query
        if (q) {
            filteredPokemons = this.pokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(q.toLowerCase())
            );
        }

        // Apply type filter
        if (filter && filter.type && filter.type !== undefined) {
            filteredPokemons = filteredPokemons.filter(pokemon =>
                pokemon?.types?.includes(filter.type as string)
            );
        }


        this.pokemonsByPage = getPages<Pokemon>(filteredPokemons, pageSize);

        const result = {
            results: this.pokemonsByPage[page],
            meta: {
                nextPage: page + 1,
                hasNextPage: page + 1 < this.pokemonsByPage.length,
                totalPage: this.pokemonsByPage.length
            }
        };

        return result;
    }
}

// import jsonPokemons from "./pokemon_list.json";

const jsonPokemons = await import("./pokemon_list.json");

export const pokemonInternalRepo = new PokemonRepository(jsonPokemons.pokemons);