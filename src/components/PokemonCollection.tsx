import { Center, SimpleGrid, Text } from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import { PokemonState } from "../services/simulator";
import { CardPokemonSelect } from "./CardPokemonSelection";

export const PokemonCollection = ({ pokemonList }: { pokemonList: PokemonState[]; }) => {
    return (
        <SimpleGrid cols={1} spacing={20}>
            {pokemonList.length === 0 && (
                <Center h={200}>
                    <Text>Belum ada pokemon</Text>
                </Center>
            )}
            {pokemonList.map(({ fedBerries, ...pokemon }, index) => (
                <CardPokemonSelect key={index} index={index} pokemonName={pokemon.name ?? ""} />
            ))}
        </SimpleGrid>
    );
};
