
import { beforeEach, describe, vi, it, expect } from 'vitest';
import { PokemonStore, PokemonState, BerryState } from '../simulator';

describe('PokemonStore', () => {
    let store: PokemonStore;

    beforeEach(() => {
        // Initialize or reset the store before each test
        store = {
            selectedPokemon: undefined,
            pokemonList: [],
            setSelectedPokemon: vi.fn(),
            deleteSelectedPokemon: vi.fn(),
            feedPokemon: vi.fn(),
            getBerryGain: vi.fn(),
            addPokemon: vi.fn(),
            checkEvolution: vi.fn(),
            evolvePokemon: vi.fn(),
        };
    });

    it('should set selected pokemon', () => {
        const pokemon: PokemonState = {
            name: 'Pikachu',
            fedBerries: [],
            weight: 10,
        };
        store.setSelectedPokemon(pokemon);
        expect(store.setSelectedPokemon).toHaveBeenCalledWith(pokemon);
    });

    it('should delete selected pokemon', () => {
        store.deleteSelectedPokemon();
        expect(store.deleteSelectedPokemon).toHaveBeenCalled();
    });

    it('should feed pokemon', () => {
        const berry: BerryState = { /* your berry state */ };
        store.feedPokemon(berry);
        expect(store.feedPokemon).toHaveBeenCalledWith(berry);
    });

    it('should get berry gain', () => {
        const firmness = 'hard';
        store.getBerryGain(firmness);
        expect(store.getBerryGain).toHaveBeenCalledWith(firmness);
    });

    it('should add pokemon', () => {
        const pokemon: Pokemon = { /* your pokemon */ };
        store.addPokemon(pokemon);
        expect(store.addPokemon).toHaveBeenCalledWith(pokemon);
    });
});