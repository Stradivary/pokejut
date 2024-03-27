import '@/styles/index.scss';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { RouterProvider } from 'react-router-dom';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { localStoragePersister, queryClient } from './utils/query';
import { router } from './utils/router';
import { theme } from './utils/theme';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider theme={theme} withCssVariables defaultColorScheme="dark">
      <ModalsProvider>
        <Notifications position='top-center'/>
        <PersistQueryClientProvider client={queryClient}
          persistOptions={{ persister: localStoragePersister }}>
          <RouterProvider router={router} />
        </PersistQueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
