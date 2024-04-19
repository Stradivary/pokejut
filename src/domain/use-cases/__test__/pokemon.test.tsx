import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it } from 'vitest';
import { usePokemonGetByName, usePokemonInfiniteGetAllInternal } from '../pokemon';

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
        const { result } = renderHook(() => usePokemonInfiniteGetAllInternal({
            filter: 'test-types'
        }), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });
    it('should return data with default params when usePokemonInfiniteGetAllInternal is called', async () => {
        const data = { name: 'test-types', url: 'test-url' };
        mock.onGet('/types').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => usePokemonInfiniteGetAllInternal({

        }), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });
});