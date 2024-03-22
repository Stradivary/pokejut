import { beforeEach, describe, vi, it, expect } from "vitest";
import { PokemonStore, BerryState } from ".";
import { PokemonState } from './PokemonState';
import { Pokemon } from "@/domain/entities/pokemon";

describe("PokemonStore", () => {
  let store: PokemonStore;

  beforeEach(() => {
    // Initialize or reset the store before each test
    store = {
      selectedPokemon: vi.fn(),
      selectedPokemonId: undefined,
      selectedPokemonEvolutionName: undefined,
      pokemonList: [],
      setSelectedPokemon: vi.fn(),
      deleteSelectedPokemon: vi.fn(),
      releaseSelectedPokemon: vi.fn(),
      feedPokemon: vi.fn(),
      addPokemon: vi.fn(),
      catchPokemon: vi.fn(),

      evolveSelectedPokemon: vi.fn(),
    };
  });

  it("should set selected pokemon", () => {
    const pokemon: PokemonState = {
      pokeId: "1",
      name: "Pikachu",
      fedBerries: [],
      weight: 10,
    };
    store.setSelectedPokemon(pokemon);
    expect(store.setSelectedPokemon).toHaveBeenCalledWith(pokemon);
  });

  it("should delete selected pokemon", () => {
    store.deleteSelectedPokemon();
    expect(store.deleteSelectedPokemon).toHaveBeenCalled();
  });

  it("should feed pokemon", () => {
    const berry: BerryState = {
      /* your berry state */
    };
    store.feedPokemon("1", berry);
    expect(store.feedPokemon).toHaveBeenCalledWith("1", berry);
  });


  it("should add pokemon", () => {
    const pokemon = {
      /* your pokemon */
    } as Pokemon;
    store.addPokemon(pokemon);
    expect(store.addPokemon).toHaveBeenCalledWith(pokemon);
  });
});
