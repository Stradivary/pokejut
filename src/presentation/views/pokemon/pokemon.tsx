import { Stack, Title } from "@mantine/core";
import { PokemonCollection } from "../../components/PokemonCollection";
import { usePokemonStore } from "@/domain/useCases/simulator";

export function Component() {
    const { pokemonList } = usePokemonStore();
    return (
        <Stack>
            <Title order={1}>Pokemon Kamu</Title>
            <PokemonCollection pokemonList={pokemonList} />
        </Stack>
    );
}

Component.displayName = 'AboutPage';