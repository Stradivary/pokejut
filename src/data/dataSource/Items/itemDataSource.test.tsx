
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useItemGetAll, useItemGetByName } from './itemsDataSource';
import { describe, expect, it } from 'vitest';
import { act } from 'react-dom/test-utils';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('Item Data Source', () => {
    it('should return data when useItemGetAll is called', async () => {
        const data = { results: [{ name: 'test-items', url: 'test-url' }] };
        mock.onGet('/items').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useItemGetAll({ offset: 0, limit: 10 }), { wrapper });

        act(() => {
           
            waitFor(() => result.current.isSuccess);

        });
        expect(result.current.data).toEqual(undefined);
    });

    it('should return data when useItemGetByName is called', async () => {
        const data = { name: 'test-items', url: 'test-url' };
        mock.onGet('/items/test-items').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useItemGetByName('test-items'), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });
});