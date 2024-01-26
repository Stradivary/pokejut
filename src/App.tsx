import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/index.scss';


import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from './utils/query';
import { router } from './utils/router';
import { theme } from './utils/theme';

function App() {
  return (
    <MantineProvider theme={theme} withCssVariables defaultColorScheme="dark">
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Notifications withinPortal position='top-right' />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
