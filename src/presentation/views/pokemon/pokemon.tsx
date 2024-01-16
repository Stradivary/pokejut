import { Stack, Title } from "@mantine/core";
import { PokemonCollection } from "../../components/PokemonCollection";
import { useSimulator } from "@/domain/useCases/simulator";

export function Component() {
    const { pokemonList } = useSimulator();
    return (
        <Stack>
            <Title order={1}>Pokemon Kamu</Title>
            <PokemonCollection pokemonList={pokemonList} />
        </Stack>
    );
}

Component.displayName = 'AboutPage';