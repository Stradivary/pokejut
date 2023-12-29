
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/query";
import { Notifications } from "@mantine/notifications";
// Import your theme object
import { theme } from '../utils/theme';
import React from 'react';
import { Router, RouterProvider, createMemoryRouter } from 'react-router-dom';

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