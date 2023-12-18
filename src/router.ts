import { RouteObject, createBrowserRouter } from "react-router-dom";

const routes = [
    {
        path: "/",
        lazy: () => import("./routes/_layout"),
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
                lazy: () => import("./routes/pokemon"),
            },
            {
                path: "/pokedex",
                children: [
                    {
                        path: "/pokedex",
                        lazy: () => import("./routes/pokedex"),
                    },
                    {
                        path: "/pokedex/:id",
                        lazy: () => import("./routes/pokedex.$id"),
                    },
                ]
            },
            {
                path: "/settings",
                lazy: () => import("./routes/settings"),
            }
        ],
    },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);