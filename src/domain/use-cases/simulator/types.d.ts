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
    addPokemon: (pokemon: Pokemon) => void;
    evolveSelectedPokemon: (evolvedPokemon: PokemonState, navigate: NavigateFunction) => void;
};
