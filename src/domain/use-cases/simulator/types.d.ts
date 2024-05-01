import { type Pokemon } from '@/data/pokemon';
import { EvolutionChain, type PokemonEvolution } from "@/data/entities/evolution";

export type PokemonState = Partial<Omit<Pokemon, 'weight'>> & Partial<Omit<PokemonEvolution, 'id'>> & {
    pokeId: string;
    fedBerries: string[];
    evolves_to?: EvolutionChain;
    weight: number;
};

export type BerryState = Partial<Berry>;

export type PokemonStore = {
    selectedPokemonId: string | undefined;
    selectedPokemonEvolutionName: string | undefined;
    pokemonList: PokemonState[];
    selectedPokemon: () => PokemonState | undefined;
    setSelectedPokemon: (pokemon: PokemonState | undefined) => void;
    clearSelectedPokemon: () => void;
    clearPokemonList: () => void;
    releaseSelectedPokemon: () => void;
    catchPokemon: (pokemon: any) => void;
    feedPokemon: (pokemonId: string, berry: BerryState) => void;
    evolveSelectedPokemon: (evolvedPokemon: PokemonState, navigate: NavigateFunction) => void;
};


export type CollectionStore = {
    selectedPokemonId: string | undefined;
    selectedPokemonEvolutionName: string | undefined;
    pokemonList: PokemonState[];
    selectedPokemon: () => PokemonState | undefined;
    selectPokemon: (pokemon: PokemonState | undefined) => void;
    deselectPokemon: () => void;
    releaseAllPokemon: () => void;
    releaseCurrentPokemon: () => void;
};

export type FeederStore = {
    feedPokemon: (berry: BerryState) => void;
};

export type EvolverStore = {
    evolvePokemon: (evolvedPokemon: PokemonState, navigate: NavigateFunction) => void;
};