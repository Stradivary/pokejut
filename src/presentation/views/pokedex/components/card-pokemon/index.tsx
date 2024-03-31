import { Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";

import React, { ReactNode, useEffect, useState } from "react";
import { getColorByType } from "@/utils/constants";
import "./style.module.scss";
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";

export const CardPokemon: React.FC<{ pokemonName: string; }> = ({ pokemonName }) => {
  const [color, setColor] = useState<string | undefined>("#fff");
  const { data: pokemon } = usePokemonGetByName(pokemonName);




  useEffect(() => {
    if (pokemonName) {
      const Color = getColorByType(pokemon ? pokemon?.types[0].type.name : "");
      setColor(Color);
    }
  }, [pokemonName, pokemon]);


  useEffect(() => {
    if (pokemon) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [pokemon]);

  const statIcons: Record<string, ReactNode> = {
    hp: "❤️",
    attack: "⚔️",
    defense: "🛡️",
    'special-attack': "🔥",
    'special-defense': "🔥🛡️",
    speed: "🏃"
  };

  return (
    <div
      className={"card-pokemon"}
      style={{
        marginTop: 40,
        backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
        viewTransitionName: "pokemon-card-" + pokemonName
      }}
    >
      <Group>
        <Image
          loading="lazy"
          draggable={false}
          className="card-pokemon-img"
          style={{
            viewTransitionName: "pokemon-image-" + pokemonName
          }}
          src={
            pokemon?.sprites.other["dream_world"].front_default
              ? pokemon?.sprites.other["dream_world"].front_default
              : pokemon?.sprites.front_default
          }
          fallbackSrc="/pokenull.webp"
          alt="Selected Pokemon"
        />
        <Stack my={24}>
          <span className="card-pokemon-name">{pokemon?.name}</span>
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
                {(pokemon?.weight ?? 0)} Kg
              </Text>
              ⚖️
            </Group>
          </Group>

          <SimpleGrid cols={2}>
            {pokemon?.stats.map((stats: { base_stat: number; stat: { name: string; }; }) => {
              return (
                <Group>
                  {statIcons[stats.stat.name] ?? <></>}
                  <span>{stats.base_stat}</span>
                </Group>
              );
            })}

          </SimpleGrid>
        </Stack>

      </Group>




    </div>
  );
};
