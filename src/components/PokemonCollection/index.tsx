import { Center, SimpleGrid, Text } from "@mantine/core";
import { PokemonState } from "../../services/simulator";
import { CardPokemonSelect } from "../CardPokemonSelection";

export const PokemonCollection = ({ pokemonList }: { pokemonList: PokemonState[]; }) => {
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
