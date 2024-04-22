
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, expect, it } from 'vitest';
import { useItemGetByName } from '../items';

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

describe('Item Data Source', () => {

    it('should return data when useItemGetByName is called', async () => {
        const data = { name: 'test-items', url: 'test-url' };
        mock.onGet('/items/test-items').reply(200, data);

        const wrapper = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>;
        const { result } = renderHook(() => useItemGetByName('test-items'), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(undefined);
    });
});