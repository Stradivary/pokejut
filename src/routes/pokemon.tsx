import { Center, SimpleGrid, Text, Title, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";

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
    return (
        <SimpleGrid cols={1}>
            <Center h={200}>
                <Text>Belum ada pokemon</Text>
            </Center>
        </SimpleGrid>
    );
};

Component.displayName = 'AboutPage';