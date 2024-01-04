import { Group, Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  Barbell,
  Gauge,
  HandFist,
  Heartbeat,
  Ruler,
  ShieldChevron,
  ShieldPlus,
  Sword,
} from "@phosphor-icons/react";
import React, { ReactNode, useEffect, useState } from "react";
import usePokemonStore, { PokemonState } from "../../services/simulator";
import { pokemonData } from "../../utils/constants";
import { BerriesFeeder } from "./BerriesFeeder";
import styles from "./style.module.scss";

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

export const PokemonDetail: React.FC = () => {
  const { selectedPokemon: pokemonState } = usePokemonStore();
  const [color, setColor] = useState<string | undefined>("#fff");
  const { weight, ...pokemon } = pokemonState ?? {} as PokemonState;

  useEffect(() => {
    const Color = getColorByType(pokemonState?.types?.[0]?.type?.name ?? "") ?? undefined;
    setColor(Color);
  }, [pokemonState]);


  const statIcons: Record<string, ReactNode> = {
    hp: <Heartbeat size={24} weight="duotone" alt="hit points" />,
    attack: <HandFist size={24} weight="duotone" alt="attack" />,
    defense: <ShieldChevron size={24} weight="duotone" alt="defense" />,
    'special-attack': <Sword size={24} weight="duotone" alt="special attack" />,
    'special-defense': <ShieldPlus size={24} weight="duotone" alt="special defense" />,
    speed: <Gauge size={24} weight="duotone" alt="speed" />,
  };

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Paper
        className={styles["card-pokemon"]}
        style={{
          marginTop: 40,
          backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
          viewTransitionName: "pokemon-card"
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
              pokemon?.sprites?.other["official-artwork"]?.front_default
                ? pokemon?.sprites?.other["official-artwork"]?.front_default
                : pokemon?.sprites?.other?.home?.front_default
                  ? pokemon?.sprites?.other?.home?.front_default
                  : "pokenull.png"
            }
            alt="Pokémon selecionado"
          />
          <Stack my={24}>
            <Text className={styles["card-pokemon-name"]}
            >{pokemon?.name}</Text>
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
                  {(pokemon?.height ?? 0) / 10} M
                </Text>
                <Ruler size={24} weight="duotone" />
              </Group>

              <Group align="center">
                <Text className="pokemon-stats">
                  {(weight ?? 0) / 10} Kg
                </Text>
                <Barbell size={24} weight="duotone" />
              </Group>
            </Group>

            <SimpleGrid cols={2}>
              {pokemon?.stats?.map((stats: { base_stat: number; effort: number, stat: { name: string; }; }) => {
                return (
                  <Group>
                    {statIcons[stats?.stat?.name] ?? <></>}
                    <span>{stats?.base_stat}</span>
                  </Group>
                );
              })}
            </SimpleGrid>
          </Stack>

        </Group>

      </Paper>
      <BerriesFeeder />
    </SimpleGrid>
  );
};

