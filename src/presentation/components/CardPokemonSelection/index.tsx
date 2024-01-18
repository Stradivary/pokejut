import { Group, Image, Paper, Stack, Text } from "@mantine/core";
import {
  Barbell,
  Ruler
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePokemonGetByName } from "@/domain/repository/pokemons";
import { pokemonData } from "@/utils/constants";
import styles from "./style.module.scss";
import { useSimulator } from "@/domain/useCases/simulator";

export const CardPokemonSelect: React.FC<{ pokemonName?: string; index: number; }> = ({ pokemonName, index }) => {
  const { data: pokemon } = usePokemonGetByName(pokemonName);
  const [color, setColor] = useState<string | null>("#fff");
  const navigate = useNavigate();
  const { pokemonList, setSelectedPokemon } = useSimulator();
  const pokemonDatas = pokemonList?.[index];
  function getColorByType(pokemonType: string) {
    const foundPokemon = pokemonData.find(
      (pokemon) => pokemon?.type === pokemonType
    );
    if (foundPokemon) {
      return foundPokemon?.color;
    } else {
      return null;
    }
  }



  useEffect(() => {
    if (pokemonName) {
      const Color = getColorByType(pokemon ? pokemon?.types[0].type.name : "");
      setColor(Color);
    }
  }, [pokemonName, pokemon]);



  return (
    <Paper
      className={styles["card-pokemon"]}
      shadow="sm"
      withBorder
      style={{
        marginTop: 40,
        borderLeftColor: `${color}`,
        viewTransitionName: "pokemon-card"
      }}
      onClick={() => {
        setSelectedPokemon(pokemonList?.[index] ?? undefined);
        navigate(`./${index}`);
      }}
    >
      <Group>
        <Image
          loading="lazy"
          draggable={false}
          className={styles["card-pokemon-img"]}
          style={{
            viewTransitionName: "pokemon-image"
          }}
          src={
            pokemon?.sprites.other["official-artwork"].front_default
              ? pokemon?.sprites.other["official-artwork"].front_default
              : pokemon?.sprites.other.home.front_default
                ? pokemon?.sprites.other.home.front_default
                : "pokenull.png"
          }
          alt="Pokémon selecionado"
        />
        <Stack my={24} align="center" mx="auto">
          <Text className={styles["card-pokemon-name"]}>{pokemon?.name}</Text>
          <Group align="center">
            {pokemon?.types.map((type: { type: { name: string; }; }, i: number) => {
              return (
                <Image
                  loading="lazy"
                  key={i}
                  draggable={false}
                  w={40}
                  src={`/types/${type.type.name}.svg`}
                  alt=""
                />
              );
            })}
          </Group>
          <Group>
            <Group align="center">
              <Text className="pokemon-stats">
                {(pokemon?.height ?? 0)} M
              </Text>
              <Ruler size={24} weight="duotone" />
            </Group>

            <Group align="center">
              <Text className="pokemon-stats">
                {(pokemonList.find(x => x.name === pokemonName)?.weight ?? 0)} Kg
              </Text>
              <Barbell size={24} weight="duotone" />
            </Group>
          </Group>


        </Stack>

      </Group>
    </Paper>
  );
};
