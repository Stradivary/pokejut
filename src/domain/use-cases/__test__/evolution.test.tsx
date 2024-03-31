
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it } from 'vitest';
import { findEvolutionChain, useEvolutionChainByPokemonName, useEvolutionGetAll, useEvolutionGetByName, usePokemonGetEvolutionChain, usePokemonGetSpecies } from '../evolution';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('EvolutionDataSource', () => {
    it('should get all evolutions', async () => {
        const mockResponse = { data: ['evolution1', 'evolution2'] };
        mock.onGet('https://pokeapi.co/api/v2/evolution').reply(200, mockResponse);

        const wrapper = ({ children }) => (<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>);
        const { result } = renderHook(() => useEvolutionGetAll(
            { offset: 0, limit: 10 }
        ), { wrapper });

        await waitFor(() => {
            expect(result.current.data?.data).toEqual(mockResponse.data);
        });
    });

    it('should get an evolution by name', async () => {
        const mockResponse = { data: { id: 1, name: 'evolution1' } };
        mock.onGet('https://pokeapi.co/api/v2/evolution/evolution1').reply(200, mockResponse);

        const wrapper = ({ children }) => (<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>);
        const { result } = renderHook(() => useEvolutionGetByName('evolution1'), { wrapper });
        await waitFor(() => {
            expect(result.current.data).toEqual(mockResponse.data);
        });
    });

    it('should get a pokemon species', async () => {
        const mockResponse = { data: { id: 1, name: 'pokemon1' } };
        mock.onGet('https://pokeapi.co/api/v2/pokemon-species/1').reply(200, mockResponse);

        const wrapper = ({ children }) => (<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>);
        const { result } = renderHook(() => usePokemonGetSpecies('1'), { wrapper });

        await waitFor(() => {
            expect(result.current.data?.data).toEqual(mockResponse.data);
        });
    });

    it('should get a pokemon evolution chain', async () => {
        const mockResponse = { data: { id: 1, chain: 'evolution1' } };
        mock.onGet('https://pokeapi.co/api/v2/evolution-chain/1').reply(200, mockResponse);

        const wrapper = ({ children }) => (<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>);
        const { result } = renderHook(() => usePokemonGetEvolutionChain('1'), { wrapper });
        await waitFor(() => {

            expect(result.current.data).toEqual({ data: { id: 1, chain: 'evolution1' } });
        });

    });

    it('should get a pokemon evolution chain by pokemon name', async () => {
        const mockSpeciesResponse = { data: { id: 1, name: 'pokemon1', evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1' } } };
        const mockEvolutionChainResponse = { data: { id: 1, chain: 'evolution1' } };
        mock.onGet('https://pokeapi.co/api/v2/pokemon-species/1').reply(200, mockSpeciesResponse);
        mock.onGet('https://pokeapi.co/api/v2/evolution-chain/1').reply(200, mockEvolutionChainResponse);

        const wrapper = ({ children }) => (<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>);
        const { result } = renderHook(() => useEvolutionChainByPokemonName('pokemon1'), { wrapper });

        await waitFor(() => {
            expect(result.current.data).toEqual(undefined);
        });
    });
});

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
        expect(findEvolutionChain(data, 'pikachu')).toEqual(null);
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
