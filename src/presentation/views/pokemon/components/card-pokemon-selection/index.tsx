import { Group, Image, Paper, Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { usePokemonGetByName } from "@/domain/data-source/Pokemon/pokemonDataSource";
import { useSimulator } from "@/domain/use-cases/simulator";
import { getColorByType } from "@/utils/constants";
import styles from "./style.module.scss";

export const CardPokemonSelect: React.FC<{ pokemonName: string; index: string; weight: any; }> = ({ pokemonName, index, weight }) => {
  const { data: pokemon } = usePokemonGetByName(pokemonName);
  const [color, setColor] = useState<string | undefined>("#fff");
  const { pokemonList, setSelectedPokemon } = useSimulator();

  useEffect(() => {
    if (pokemonName) {
      const Color = getColorByType(pokemon ? pokemon?.types[0].type.name : "");
      setColor(Color);
    }
  }, [pokemonName, pokemon]);



  return (
    <Paper
      component={Link}
      to={`./selected`}
      unstable_viewTransition
      className={styles["card-pokemon"]}
      shadow="sm"
      withBorder
      style={{
        padding: 20,
        borderLeftColor: `${color}`,
        viewTransitionName: `pokemon-card-${index}`
      }}
      onClick={() => {
        const selectedPoke = pokemonList.find(x => x.pokeId === index);
        setSelectedPokemon(selectedPoke);
      }}
    >
      <Group align="stretch">
        <Image
          loading="lazy"
          draggable={false}
          className={styles["card-pokemon-img"]} 
          style={{
            minWidth: 160,
            viewTransitionName: `pokemon-image-${index}`
          }}
          src={
            pokemon?.sprites.other["dream_world"].front_default
              ? pokemon?.sprites.other["dream_world"].front_default
              : pokemon?.sprites.other.home.front_default
          }
          fallbackSrc="/pokenull.webp"
          alt="Selected Pokemon"
        />
        <Stack my={24} align="center" mx="auto">
          <Text className={styles["card-pokemon-name"]}>{pokemon?.name}</Text>
          <Group align="center">
            {pokemon?.types?.map((type: { type: { name: string; }; }, i: number) => {
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
              📏
            </Group>

            <Group align="center">
              <Text className="pokemon-stats">
                {(weight ?? 0)} Kg
              </Text>
              ⚖️
            </Group>
          </Group>


        </Stack>

      </Group>
    </Paper>
  );
};
