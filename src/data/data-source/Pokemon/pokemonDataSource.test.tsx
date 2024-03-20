import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { describe, expect, it } from 'vitest';
import { getOffsetAndLimitFromUrl, usePokemonGetAll, usePokemonGetByName, usePokemonInfiniteGetAllInternal } from './pokemonDataSource';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('Pokemon Data Source', () => {
    it('should return data when usePokemonGetByName is called', async () => {
        const data = { name: 'test-types', url: 'test-url' };
        mock.onGet('/types/test-types').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => usePokemonGetByName('test-types'), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });

    //PokemonQueryInfiniteInternal
    it('should return data when usePokemonInfiniteGetAllInternal is called', async () => {
        const data = { name: 'test-types', url: 'test-url' };
        mock.onGet('/types').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => usePokemonInfiniteGetAllInternal({ offset: 0, limit: 10 }), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });

    //PokemonQueryInfinite 


    it('should return data when getOffsetAndLimitFromUrl is called', async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
        const offset = 0;
        const limit = 10;
        const result = getOffsetAndLimitFromUrl(url);
        expect(result).toEqual({ offset, limit });
    });

    it('should return default when getOffsetAndLimitFromUrl is called', async () => {
        const url = undefined;
        const offset = 0;
        const limit = 10;
        const result = getOffsetAndLimitFromUrl(url);
        expect(result).toEqual({ offset, limit });
    });
});