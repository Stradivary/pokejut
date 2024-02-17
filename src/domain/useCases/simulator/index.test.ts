
import { renderHook, waitFor } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, describe, it } from 'vitest';
import { PokemonState, useSimulator } from './index';
import { setupServer } from 'msw/node';
import { Pokemon } from '@/domain/entities/Pokemon';

const server = setupServer();

beforeAll(() => server.listen());
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
} as Pokemon;
describe('useSimulator', () => {
    it('should set selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.setSelectedPokemon({ name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] } as PokemonState);
        });

        expect(result.current.selectedPokemon?.name).toEqual('Pikachu');
    });

    it('should delete selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.setSelectedPokemon({ name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] } as PokemonState);
            result.current.deleteSelectedPokemon();
        });

        expect(result.current.selectedPokemon).toBeUndefined();
    });

    it('should catch a pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
        });

        expect(result.current.selectedPokemon?.name).toEqual(newPokemon.name);
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
            result.current.feedPokemon(result.current.selectedPokemon?.pokeId ?? "1", { firmness: { name: 'soft', url: '' } });
        });

        expect(result.current.selectedPokemon?.fedBerries).toStrictEqual([]);
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

        expect(result.current.selectedPokemon?.name).toBe('Raichu');
    });

    it('should not evolve selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());
        const pokemon = { name: 'Pikachu', pokeId: '1', weight: 10, fedBerries: [] };

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.evolveSelectedPokemon(pokemon);
        });

        expect(result.current.selectedPokemon?.name).toBe('Pikachu');
    });
});