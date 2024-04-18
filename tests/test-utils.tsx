import React from 'react';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { render as testingLibraryRender } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { queryClient } from "@/utils/query";
import { theme } from '@/utils/theme';

export const wrapper = ({ children }: { children: React.ReactNode; }) => {
    const mem = createMemoryRouter([
        { path: "/", element: <>{children}</> },
    ]);
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
                <ModalsProvider>
                    <RouterProvider router={mem} />
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    );
};

export function render(ui: React.ReactNode) {
    return testingLibraryRender(<>{ui}</>, {
        wrapper,
    });
}