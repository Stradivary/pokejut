import { useSimulator } from "@/domain/use-cases/simulator";
import { Center, SimpleGrid, Text } from "@mantine/core";
import { CardPokemonSelect } from "../card-pokemon-selection";

export const PokemonCollection = () => {

  const { pokemonList } = useSimulator();
  return (
    <SimpleGrid cols={1} spacing={24}>
      {pokemonList.length === 0 && (
        <Center h={200}>
          <Text>Belum ada pokemon</Text>
        </Center>
      )}
      {pokemonList.map(({ name, pokeId, weight }) => (
        <CardPokemonSelect key={pokeId} index={pokeId} pokemonName={name ?? ""} weight={weight} />
      ))}
    </SimpleGrid>
  );
};
