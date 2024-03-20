import { Stack, Title } from "@mantine/core";
import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonCollection } from "./components/pokemon-collection";

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
