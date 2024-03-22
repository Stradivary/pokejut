import { Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
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
import { pokemonData } from "@/utils/constants";
import "./style.module.scss";
import { usePokemonGetByName } from "@/data/data-source/Pokemon/pokemonDataSource";

export const CardPokemon: React.FC<{ pokemonName: string; }> = ({ pokemonName }) => {
  const [color, setColor] = useState<string | null>("#fff");
  const { data: pokemon } = usePokemonGetByName(pokemonName);


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
    hp: <Heartbeat size={24} weight="duotone" alt="hit points" />,
    attack: <HandFist size={24} weight="duotone" alt="attack" />,
    defense: <ShieldChevron size={24} weight="duotone" alt="defense" />,
    'special-attack': <Sword size={24} weight="duotone" alt="special attack" />,
    'special-defense': <ShieldPlus size={24} weight="duotone" alt="special defense" />,
    speed: <Gauge size={24} weight="duotone" alt="speed" />,
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
            pokemon?.sprites.other["official-artwork"].front_default
              ? pokemon?.sprites.other["official-artwork"].front_default
              : pokemon?.sprites.other.home.front_default
                ? pokemon?.sprites.other.home.front_default
                : "pokenull.png"
          }
          alt="Pokémon selecionado"
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
              <Ruler size={24} weight="duotone" />
            </Group>

            <Group align="center">
              <Text className="pokemon-stats">
                {(pokemon?.weight ?? 0)} Kg
              </Text>
              <Barbell size={24} weight="duotone" />
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
