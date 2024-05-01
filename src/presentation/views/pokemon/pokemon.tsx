import { CollectionDB } from "@/domain/use-cases/simulator/usePokemonCollection";
import { Center, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CardPokemonSelect } from "./components/card-pokemon-selection";

export function Component() {
  const { data: pokemonList, refetch } = useQuery({ queryKey: ["pokemonList"], queryFn: CollectionDB.getAll });
  const { data: count, refetch: countRefetch } = useQuery({ queryKey: ["pokemonCount"], queryFn: CollectionDB.count });

  refetch();
  countRefetch();
  return (
    <Stack m="md">
      <Title order={1}>Pokemon Kamu</Title>
      <SimpleGrid cols={1} spacing={24}>
        {count === 0 && (
          <Center h={200}>
            <Text>Belum ada pokemon</Text>
          </Center>
        )}
        {pokemonList?.map(({ name, pokeId, weight }) => (
          <CardPokemonSelect key={pokeId} index={pokeId}
            pokemonName={name ?? ""} weight={weight} />
        ))}
      </SimpleGrid>

    </Stack>
  );
}

Component.displayName = "AboutPage";
