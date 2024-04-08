import { Navigate, RouteObject } from "react-router-dom";

// this is routing configuration, we can use it to manage our routes and it's corresponding components
export const routes = [
    {
        path: "/",
        lazy: () => import("./presentation/views/_layout"),
        children: [

            {
                index: true,
                Component: () => <Navigate to="/pokedex" />
            },
            {
                path: "/pokemon",
                children: [
                    {
                        path: "/pokemon",
                        lazy: () => import("./presentation/views/pokemon/pokemon"),
                    },
                    {
                        path: "/pokemon/selected",
                        lazy: () => import("./presentation/views/pokemon/pokemon.selected"),
                    },
                    {
                        path: "/pokemon/*",
                        element: <Navigate to="/pokemon/selected" />
                    }
                ]
            },
            {
                path: "/pokedex",
                children: [
                    {
                        path: "/pokedex",
                        lazy: () => import("./presentation/views/pokedex/pokedex"),
                    },
                    {
                        path: "/pokedex/*",
                        element: <Navigate to="/pokedex" />
                    }
                ]
            },
            {
                path: "/settings",
                children: [
                    {
                        index: true,
                        lazy: () => import("./presentation/views/settings/settings"),
                    },
                    {
                        path: "/settings/*",
                        element: <Navigate to="/settings" />
                    }
                ]
            },
            {
                path: "*",
                Component: () => <Navigate to="/pokedex" />
            }
        ],
    },
] satisfies RouteObject[];
