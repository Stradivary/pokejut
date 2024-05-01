
import { renderHook, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { PokemonState } from '../simulator/types';
import { useSimulator } from '../simulator/index';


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
        other: {} as any
    }, stats: {
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
    }, types: [],
    fedBerries: []
} as unknown as PokemonState;
describe('useSimulator', () => {
    it('should set selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());


        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
        });

        expect(result.current.selectedPokemon()?.name).toEqual('Pikachu');
    });

    it('should delete selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.setSelectedPokemon({ name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] } as PokemonState);
            result.current.clearSelectedPokemon();
        });

        expect(result.current.selectedPokemonId).toBeUndefined();
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
    });


    // Add more tests for other functions like feedPokemon, addPokemon, checkifSelectedPokemonCanEvolve, evolveSelectedPokemon
    it('should feed a pokemon', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.setSelectedPokemon(result.current.pokemonList?.[0]);
            const id = result.current.pokemonList?.[0].pokeId;
            result.current.feedPokemon(id, { firmness: { name: 'soft', url: '' } });
            result.current.feedPokemon(id, { firmness: undefined });
        });

        expect(result.current.selectedPokemon()?.fedBerries).toStrictEqual(["soft", ""]);
    });

    it('should get a weight loss if fed with berry of same firmness', async () => {
        const { result } = renderHook(() => useSimulator());
        const pokemon = { name: 'Pikachu', pokeId: '1', weight: 10, fedBerries: [] };

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.setSelectedPokemon(result.current.pokemonList?.[0]);
            const id = result.current.pokemonList?.[0].pokeId;
            result.current.feedPokemon(id, { firmness: { name: 'very-hard', url: '' } });
            result.current.feedPokemon(id, { firmness: { name: 'very-hard', url: '' } });
            result.current.feedPokemon(id, { firmness: { name: 'very-hard', url: '' } });
            result.current.feedPokemon(id, { firmness: { name: 'very-hard', url: '' } });
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
        const { id: _, ...newPoke } = newPokemon;
        await waitFor(() => {
            result.current.catchPokemon(newPoke as any);
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
                species: {
                    name: 'raichu',
                    url: ''
                },
                fedBerries: [],
            }, (to: any) => {
                console.log(to);
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
            }, (to: any) => {
                console.log(to);
            });
        });

        expect(result.current.selectedPokemon()?.name).toBeUndefined();
    });

    it('should not evolve selected pokemon', async () => {
        const { result } = renderHook(() => useSimulator());
        const pokemon = { name: 'Pikachu', pokeId: '1', weight: 10, fedBerries: [] };

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.evolveSelectedPokemon(pokemon, (to: any) => {
                console.log(to);
            });
        });

        expect(result.current.selectedPokemon()?.name).toBe('Pikachu');
    });

    it('should clear pokemon list', async () => {
        const { result } = renderHook(() => useSimulator());

        await waitFor(() => {
            result.current.catchPokemon(newPokemon);
            result.current.clearPokemonList();
        });

        expect(result.current.pokemonList).toEqual([]);
    });
});