// FILEPATH: /home/syid/dev/pokemon-app/src/data/dataSource/Berries/berryDataSource.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useBerryGetAll, useBerryGetByName } from './berryDataSource';
import { describe, expect, it } from 'vitest';
import { act } from 'react-dom/test-utils';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('Berry Data Source', () => {
    it('should return data when useBerryGetAll is called', async () => {
        const data = { results: [{ name: 'test-berry', url: 'test-url' }] };
        mock.onGet('/berry').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useBerryGetAll({ offset: 0, limit: 10 }), { wrapper });

        act(() => {
           
            waitFor(() => result.current.isSuccess);

        });
        expect(result.current.data).toEqual(undefined);
    });

    it('should return data when useBerryGetByName is called', async () => {
        const data = { name: 'test-berry', url: 'test-url' };
        mock.onGet('/berry/test-berry').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useBerryGetByName('test-berry'), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });
});