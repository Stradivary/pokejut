import { Center, SimpleGrid, Text } from "@mantine/core";
import { CardPokemonSelect } from "../card-pokemon-selection";
import { PokemonState } from "@/domain/use-cases/simulator";

export const PokemonCollection = ({
  pokemonList,
}: {
  pokemonList: PokemonState[];
}) => {
  return (
    <SimpleGrid cols={1} spacing={20}>
      {pokemonList.length === 0 && (
        <Center h={200}>
          <Text>Belum ada pokemon</Text>
        </Center>
      )}
      {pokemonList.map(({ name }, index) => (
        <CardPokemonSelect key={index} index={index} pokemonName={name ?? ""} />
      ))}
    </SimpleGrid>
  );
};
