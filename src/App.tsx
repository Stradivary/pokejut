import '@/styles/index.scss';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { localStoragePersister, queryClient } from './utils/query';
import { router } from './utils/router';
import { theme } from './utils/theme';

function App() {
  return (
    <MantineProvider theme={theme} withCssVariables defaultColorScheme="dark">
      <ModalsProvider>
        <PersistQueryClientProvider client={queryClient}
          persistOptions={{ persister: localStoragePersister }}>
          <RouterProvider router={router} />
          <Notifications withinPortal position='top-right' />
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
