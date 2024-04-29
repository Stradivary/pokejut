import { Center, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useSimulator } from "@/domain/use-cases/simulator";
import { CardPokemonSelect } from "./components/card-pokemon-selection";

export function Component() {
  const { pokemonList } = useSimulator();
  return (
    <Stack m="md">
      <Title order={1}>Pokemon Kamu</Title>
      <SimpleGrid cols={1} spacing={24}>
        {pokemonList.length === 0 && (
          <Center h={200}>
            <Text>Belum ada pokemon</Text>
          </Center>
        )}
        {pokemonList.map(({ name, pokeId, weight }) => (
          <CardPokemonSelect key={pokeId} index={pokeId}
            pokemonName={name ?? ""} weight={weight} />
        ))}
      </SimpleGrid>

    </Stack>
  );
}

Component.displayName = "AboutPage";
