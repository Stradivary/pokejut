import { AppShell, Stack, Title } from "@mantine/core";
import { Outlet, useParams } from "react-router-dom";
import usePokemonStore from "../services/simulator";
import { PokemonCollection } from "../components/PokemonCollection";

export function Component() {
    const { id } = useParams();
    const { pokemonList } = usePokemonStore();
    return (
        <Stack>
            <Title order={1}>Pokemon Kamu</Title>

            <PokemonCollection pokemonList={pokemonList} />
        </Stack>
    );
}

Component.displayName = 'AboutPage';