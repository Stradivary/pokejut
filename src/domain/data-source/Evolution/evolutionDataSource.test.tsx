import { describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useEvolutionGetAll, useEvolutionGetByName, usePokemonGetEvolutionChain, usePokemonGetEvolutionChainByPokemonName, usePokemonGetSpecies } from './evolutionDataSource';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

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
        const { result } = renderHook(() => usePokemonGetEvolutionChainByPokemonName('pokemon1'), { wrapper });

        await waitFor(() => {
            expect(result.current.data).toEqual(undefined);
        });
    });
});