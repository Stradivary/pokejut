
import { describe, expect, it } from 'vitest';
import { findEvolutionChain, findNextEvolution } from './useEvolutionChain';

describe('findEvolutionChain', () => {
    it('returns null when data is null', () => {
        expect(findEvolutionChain(null, 'pikachu')).toBeNull();
    });

    it('returns null when data is undefined', () => {
        expect(findEvolutionChain(undefined, 'pikachu')).toBeNull();
    });

    it('returns the data when species name matches the current species', () => {
        const data = {
            species: { name: 'pikachu' },
            evolves_to: []
        };
        expect(findEvolutionChain(data, 'pikachu')).toEqual(data);
    });

    it('returns the correct evolution chain when the species is in the evolves_to array', () => {
        const data = {
            species: { name: 'pichu' },
            evolves_to: [
                {
                    species: { name: 'pikachu' },
                    evolves_to: []
                }
            ]
        };
        expect(findEvolutionChain(data, 'pikachu')).toEqual(data.evolves_to[0]);
    });

    it('returns null when the species is not found in the evolution chain', () => {
        const data = {
            species: { name: 'pichu' },
            evolves_to: [
                {
                    species: { name: 'raichu' },
                    evolves_to: []
                }
            ]
        };
        expect(findEvolutionChain(data, 'pikachu')).toBeNull();
    });
});

describe('findNextEvolution', () => {
    it('returns null when data is null', () => {
        expect(findNextEvolution(null, 'pikachu')).toBeNull();
    });

    it('returns null when data is undefined', () => {
        expect(findNextEvolution(undefined, 'pikachu')).toBeNull();
    });

    it('returns the next evolution when the species name matches the current species', () => {
        const data = {
            species: { name: 'pikachu' },
            evolves_to: [
                {
                    species: { name: 'raichu' },
                    evolves_to: []
                }
            ]
        };
        expect(findNextEvolution(data, 'pikachu')).toEqual('raichu');
    });

    it('returns null when the species is not found in the evolution chain', () => {
        const data = {
            species: { name: 'pichu' },
            evolves_to: [
                {
                    species: { name: 'raichu' },
                    evolves_to: []
                }
            ]
        };
        expect(findNextEvolution(data, 'pikachu')).toBeNull();
    });

    it('returns null when the species has no next evolution', () => {
        const data = {
            species: { name: 'pikachu' },
            evolves_to: []
        };
        expect(findNextEvolution(data, 'pikachu')).toBeNull();
    });
}); it('returns the next evolution when the species name matches the current species', () => {
    const data = {
        species: { name: 'pikachu' },
        evolves_to: [
            {
                species: { name: 'raichu' },
                evolves_to: []
            }
        ]
    };
    expect(findNextEvolution(data, 'pikachu')).toEqual('raichu');
    expect(data.evolves_to?.[0]?.species).toEqual(data.evolves_to[0].species);
}); it('returns the next evolution when the species name matches the current species', () => {
    const data = {
        species: { name: 'pikachu' },
        evolves_to: [
            {
                species: { name: 'raichu' },
                evolves_to: []
            }
        ]
    };
    expect(findNextEvolution(data, 'pikachu')).toEqual('raichu');
    expect(data.evolves_to?.[0]?.species).toEqual(data.evolves_to[0].species);
});