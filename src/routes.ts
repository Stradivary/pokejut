import { RouteObject } from "react-router-dom";

// this is routing configuration, we can use it to manage our routes and it's corresponding components
export const routes = [
    {
        path: "/",
        lazy: () => import("./presentation/views/_layout"),
        children: [
            {
                path: "/pokemon",
                children: [
                    {
                        path: "/pokemon",
                        lazy: () => import("./presentation/views/pokemon"),
                    },
                    {
                        path: "/pokemon/:id",
                        lazy: () => import("./presentation/views/pokemon.$id"),
                    },
                ]
            },
            {
                path: "/pokedex",
                children: [
                    {
                        path: "/pokedex",
                        lazy: () => import("./presentation/views/pokedex"),
                    },
                    {
                        path: "/pokedex/:id",
                        lazy: () => import("./presentation/views/pokedex.$id"),
                    },
                ]
            },
            {
                path: "/settings",
                lazy: () => import("./presentation/views/settings"),
            }
        ],
    },
] satisfies RouteObject[];
