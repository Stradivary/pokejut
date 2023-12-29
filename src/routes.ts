import { RouteObject } from "react-router-dom";

export const routes = [
    {
        path: "/",
        lazy: () => import("./views/_layout"),
        children: [
            {
                path: "/pokemon",
                children: [
                    {
                        path: "/pokemon",
                        lazy: () => import("./views/pokemon"),
                    },
                    {
                        path: "/pokemon/:id",
                        lazy: () => import("./views/pokemon.$id"),
                    },
                ]
            },
            {
                path: "/pokedex",
                children: [
                    {
                        path: "/pokedex",
                        lazy: () => import("./views/pokedex"),
                    },
                    {
                        path: "/pokedex/:id",
                        lazy: () => import("./views/pokedex.$id"),
                    },
                ]
            },
            {
                path: "/settings",
                lazy: () => import("./views/settings"),
            }
        ],
    },
] satisfies RouteObject[];
