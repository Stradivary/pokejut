
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { render as testingLibraryRender } from '@testing-library/react';
import { queryClient } from "../utils/query";
// Import your theme object
import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { theme } from '../utils/theme';

export function render(ui: React.ReactNode) {
    return testingLibraryRender(<>{ui}</>, {
        wrapper: ({ children }: { children: React.ReactNode; }) => {
            const mem = createMemoryRouter([
                { path: "/", element: <>{children}</> },
            ]);
            return (
                <MantineProvider theme={theme}>
                    <ModalsProvider>
                        <QueryClientProvider client={queryClient}>
                            <RouterProvider router={mem} />
                            <Notifications withinPortal />
                        </QueryClientProvider>
                    </ModalsProvider>
                </MantineProvider>
            );
        },
    });
}