import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useEvolutionChain } from '../components/pokemon-detail/useEvolutionChain';
import * as evolution from '@/domain/use-cases/evolution';

describe('useEvolutionChain', () => {
    it('should return the next evolution chain when selectedPokemon is provided', () => {
        const selectedPokemon = {
            evolves_to: {
                species: { name: 'pikachu', url: '' },
                evolves_to: [{
                    species: { name: 'pikachu', url: '' },
                    evolves_to: [],
                }],
                is_baby: false,
            },
            name: 'pichu',
        } as unknown as PokemonState;

        const spy = vi.spyOn(evolution, "findEvolutionChain").mockImplementation(() => ({
            evolves_to: [],
            species: { name: 'pikachu', url: '' },
        }));
        const { result } = renderHook(() => useEvolutionChain(selectedPokemon));

        expect(spy).toHaveBeenCalled();
        expect(result.current.nextEvolutionChain).toEqual({
            evolves_to: [],
            species: { name: 'pikachu', url: '' },
        });
    });

    it('should return null when selectedPokemon is not provided', () => {
        const { result } = renderHook(() => useEvolutionChain());

        expect(result.current.nextEvolutionChain).toBeNull();
    });

    it('should return null when selectedPokemon does not have evolves_to or name', () => {
        const selectedPokemon = {} as unknown as PokemonState;

        const { result } = renderHook(() => useEvolutionChain(selectedPokemon));

        expect(result.current.nextEvolutionChain).toBeNull();
    });

    it('should call findEvolutionChain with correct parameters', () => {
        const selectedPokemon = {
            evolves_to: {
                species: { name: 'pikachu', url: '' },
                evolves_to: [],
                is_baby: false,
            },
            name: 'pichu',
        } as unknown as PokemonState;

        const spy = vi.spyOn(evolution, "findEvolutionChain");

        renderHook(() => useEvolutionChain(selectedPokemon));

        expect(spy).toHaveBeenCalled();
        vi.restoreAllMocks();

    });
});