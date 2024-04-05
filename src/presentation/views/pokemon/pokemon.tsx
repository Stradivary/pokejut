import { Stack, Title } from "@mantine/core";
import { PokemonCollection } from "./components/pokemon-collection";

export function Component() {
  return (
    <Stack m="md">
      <Title order={1}>Pokemon Kamu</Title>
      <PokemonCollection />
    </Stack>
  );
}

Component.displayName = "AboutPage";
