
import { Pokemon } from '@/domain/use-cases/entities/pokemon';
import { renderHook, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { useSimulator } from '../simulator/index';
import { PokemonState } from '../simulator/PokemonState';
import { mock } from "indexeddb-mock";

window.indexedDB = mock;

const server = setupServer();

beforeAll(() => {

    return server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const newPokemon = {
    name: 'Pikachu',
    pokeId: '1', weight: 1, height: 1, id: 1,
    abilities: [], species: { name: "", url: "" }, sprites: {
        back_default: "",
        other: {} as any
    }, stats: {
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
    }, types: []
} as unknown as Pokemon;
describe('useSimulator', () => {
    it('should set selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.setSelectedPokemon({ name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] } as PokemonState);
        });

        expect(result.current.selectedPokemon()?.name).toEqual('Pikachu');
    });

    it('should delete selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.setSelectedPokemon({ name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] } as PokemonState);
            result.current.clearSelectedPokemon();
        });

        expect(result.current.selectedPokemon).toBeUndefined();
    });

    it('should catch a pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
        });

        expect(result.current.selectedPokemon()?.name).toEqual(newPokemon.name);
    });

    it('should release selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());
        const pokemon = { name: 'Pikachu', pokeId: '1', fedBerries: [] };

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.releaseSelectedPokemon();
        });

        expect(result.current.pokemonList).not.toContainEqual(pokemon);
        expect(result.current.selectedPokemon).toBeUndefined();
    });


    // Add more tests for other functions like feedPokemon, addPokemon, checkifSelectedPokemonCanEvolve, evolveSelectedPokemon
    it('should feed a pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.setSelectedPokemon(result.current.pokemonList?.[0]);
            const id = result.current.pokemonList?.[0].pokeId;
            result.current.feedPokemon(id, { firmness: { name: 'soft', url: '' } });
        });

        expect(result.current.selectedPokemon()?.fedBerries).toStrictEqual(["soft"]);
    });

    it('should get a weight loss if fed with berry of same firmness', async () => {
        const { result } = renderHook(() => useSimulator());
        const pokemon = { name: 'Pikachu', pokeId: '1', weight: 10, fedBerries: [] };

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.setSelectedPokemon(result.current.pokemonList?.[0]);
            const id = result.current.pokemonList?.[0].pokeId;
            result.current.feedPokemon(id, { firmness: { name: 'soft', url: '' } });
            result.current.feedPokemon(id, { firmness: { name: 'soft', url: '' } });
        });

        expect(result.current.selectedPokemon()?.weight).toBeLessThan(pokemon.weight);
    });

    it('should return current state if no pokemon is selected', async () => {
        const { result } = renderHook(() => useSimulator());
        const before = result.current;
        await waitFor(() => {
            result.current.feedPokemon('1', { firmness: { name: 'soft', url: '' } });
        });
        // expect no change
        expect(result.current).toBe(before);
    });
    it('should add a pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.addPokemon(newPokemon);
        });

        expect(result.current.pokemonList?.[0]?.name).toBe(newPokemon.name);
    });


    it('should evolve selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.evolveSelectedPokemon({
                name: 'Raichu',
                pokeId: '1',
                weight: 2,
                fedBerries: [],
            });
        });

        expect(result.current.selectedPokemon()?.name).toBe('Raichu');
    });

    it('should fail to evolve selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.releaseSelectedPokemon();
            result.current.evolveSelectedPokemon({
                name: 'Raichu',
                pokeId: '1',
                weight: 20,
                fedBerries: [],
            });
        });

        expect(result.current.selectedPokemon()?.name).toBeUndefined();
    });

    it('should not evolve selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());
        const pokemon = { name: 'Pikachu', pokeId: '1', weight: 10, fedBerries: [] };

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.evolveSelectedPokemon(pokemon);
        });

        expect(result.current.selectedPokemon()?.name).toBe('Pikachu');
    });
});