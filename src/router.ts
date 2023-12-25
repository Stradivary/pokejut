import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes = [
    {
        path: "/",
        lazy: () => import("./views/_layout"),
        children: [
            // {
            //     path: "/",
            //     lazy: () => import("./routes/_index"),
            // },
            // {
            //     path: "/about",
            //     lazy: () => import("./routes/about"),
            // },
            {
                path: "/pokemon",
                lazy: () => import("./views/pokemon"),
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

export const router = createBrowserRouter(routes);