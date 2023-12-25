import { Center, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { CardPokemon } from "../components/CardPokemon";
import usePokemonStore from "../services/simulator";

export function Component() {
    return (
        <Stack>
            <Title order={1}>Pokemon Kamu</Title>

            <PokemonCollection />
            <Outlet />
        </Stack>
    );
}

const PokemonCollection = () => {
    const { pokemonList } = usePokemonStore();
    return (
        <SimpleGrid cols={1}>
            {pokemonList.length === 0 && <Center h={200}>
                <Text>Belum ada pokemon</Text>
            </Center>}
            {pokemonList.map(({ fedBerries, ...pokemon }, index) => (
                <CardPokemon key={index} pokemonName={pokemon.name ?? ""} />
            ))}
        </SimpleGrid>
    );
};

Component.displayName = 'AboutPage';