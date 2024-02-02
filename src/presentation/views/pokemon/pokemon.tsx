import { Stack, Title } from "@mantine/core";
import { useSimulator } from "@/domain/useCases/simulator";
import { PokemonCollection } from "./components/PokemonCollection";

export function Component() {
  const { pokemonList } = useSimulator();
  return (
    <Stack m="md">
      <Title order={1}>Pokemon Kamu</Title>
      <PokemonCollection pokemonList={pokemonList} />
    </Stack>
  );
}

Component.displayName = "AboutPage";
