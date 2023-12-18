import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: Infinity,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        },
    },
});

const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
}); 