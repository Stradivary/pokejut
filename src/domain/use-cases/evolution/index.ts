import { EvolutionChain, EvolveTo } from "@/data/entities/evolution";

import { queryOptions, useQuery } from "@tanstack/react-query";
import { PokeApiEntityRepository } from "../../repository/pokeApiRepository";

const entity = 'evolutions';

const pokeApiEvolutionRepository = new PokeApiEntityRepository('evolution-chain');

const pokeApiSpeciesRepository = new PokeApiEntityRepository<Species>('pokemon-species');


const evolutionOptions = (action: string, params: any, fn: () => Promise<any>) => {
    return queryOptions({
        queryKey: [entity, action, params],
        queryFn: async () => fn(),
        staleTime: Infinity,
    });
};



export const useEvolutionGetByName = (name: string) => {
    return useQuery(evolutionOptions('getByName', { name }, async () => {
        return;
    }));
};


export const usePokemonGetEvolutionChain = (evolutionChain?: string) => {
    return useQuery({
        queryKey: ["pokemon", "evolutionChain", evolutionChain],
        queryFn: async () => await pokeApiEvolutionRepository.getOne(evolutionChain ?? ""),
        enabled: !!evolutionChain,
    });
};

export const usePokemonGetSpecies = (id?: string) => {
    return useQuery({
        queryKey: ["pokemon", "species", id],
        queryFn: async () => await pokeApiSpeciesRepository.getOne(id ?? ""),
        enabled: !!id,
    });
};


export const useEvolutionChainByPokemonName = (name?: string) => {
    const { data: species } = usePokemonGetSpecies(name);
    const evolutionId = species && (species?.evolution_chain?.url.split('/').reverse()[1] ?? '');

    return usePokemonGetEvolutionChain(evolutionId);
};

export function findEvolutionChain(data: EvolutionChain, currentSpecies: string): EvolveTo | null {
    if (!data) {
        return null;
    }
    
    if (`${data?.species?.name}`.toLowerCase() === `${currentSpecies}`.toLowerCase() || `${data?.species}`.toLowerCase() === `${currentSpecies}`.toLowerCase()) {
        return data;
    }

    if (data.evolves_to) {
        for (const evolution of data.evolves_to) {
            const nextEvolution = findEvolutionChain(evolution, currentSpecies);
            if (!nextEvolution) {
                continue;
            }
            return nextEvolution;
        }
    }

    return null;
}

export function mapEvolutionChain(data: any): EvolutionChain {
    return {
        is_baby: false,
        species: data.species.name,
        evolves_to: data.evolves_to.map((evolution: any) =>
            mapEvolutionChain(evolution)
        ),
    };
}


export const evolveSelectedPokemon = (
    pokemon: any,
    evolveItem: any,
    catchPokemon: any
) => {
    if (!pokemon || !evolveItem) return false;
    const poke = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        height: pokemon.height,
        weight: pokemon.weight,
        stats: pokemon.stats,
        sprites: {
            front_default: pokemon?.sprites?.front_default,
            other: {
                dream_world: {
                    front_default:
                        pokemon?.sprites?.other?.["dream_world"]?.front_default,
                },
                home: {} as any,
            },
        },
        species: pokemon.species,
    };

    const evolves_to = mapEvolutionChain(evolveItem?.chain);

    catchPokemon({ ...poke, evolves_to });

    return true;
};
