import '@mantine/core/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { Notifications } from '@mantine/notifications';

import { router } from './router';
import { queryClient } from './utils/query';

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
  },
  defaultRadius: 'xl',
});
function App() {
  return (
    <MantineProvider theme={theme} withCssVariables defaultColorScheme="dark">
      <Notifications withinPortal />
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
