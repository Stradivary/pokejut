import { Button, Flex, Group, Image, Paper, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { useSimulator } from "@/domain/use-cases/simulator";
import { getColorByType, statIcons, statLabels } from "@/utils/constants";
import { getPokemonImage } from "@/utils/image";
import { PokemonTypeBadge } from "../../../../components/PokemonTypeBadge";
import { handleModalRelease } from "../../pokemonSelectedViewModel";
import styles from "./style.module.scss";

export const CardPokemonSelect: React.FC<{ pokemonName: string; index: string; weight: any; }> = ({ pokemonName, index, weight }) => {
  const { data: pokemon } = usePokemonGetByName(pokemonName);
  const [color, setColor] = useState<string | undefined>("#fff");
  const { pokemonList, setSelectedPokemon } = useSimulator();

  const { releaseSelectedPokemon } = useSimulator();
  const navigate = useNavigate();
  useEffect(() => {
    if (pokemonName) {
      const Color = getColorByType(pokemon?.types?.[0]?.type?.name ?? "");
      setColor(Color);
    }
  }, [pokemonName, pokemon]);



  return (
    <Paper
      className={styles["card-pokemon"]}
      shadow="sm"
      withBorder
      style={{
        padding: 20,
        '--selected-color': `${color}`,
        viewTransitionName: `pokemon-card-${index}`
      }}
    >
      <Flex>
        <Paper
          style={{
            flex: 1,
          }}
          withBorder={false}
          shadow="0"
          component={Link}
          unstable_viewTransition
          to={`./selected`} onClick={() => {
            const selectedPoke = pokemonList.find(x => x.pokeId === index);
            setSelectedPokemon(selectedPoke);
          }} >

          <Group align="stretch" >
            <Image
              loading="lazy"
              draggable={false}
              className={styles["card-pokemon-img"]}
              style={{
                minWidth: 160,
                viewTransitionName: `pokemon-image-${index}`
              }}

              src={getPokemonImage(pokemon)}
              fallbackSrc="/pokenull.webp"
              alt="Selected Pokemon"
            />
            <Stack
              my={24} align="center" mx="auto"
            >
              <Text className={styles["card-pokemon-name"]}>{pokemon?.name}</Text>
              <Group align="center">
                {pokemon?.types?.map((type: { type: { name: string; }; }) => {
                  return <PokemonTypeBadge key={`${pokemonName}-${type.type.name}-card`} type={type.type} />;
                })}
              </Group>
              <Group>
                <Tooltip label={statLabels['height']} position="top">
                  <Group align="center">
                    <Text className="pokemon-stats">
                      {(pokemon?.height ?? 0)} M
                    </Text>
                    📏
                  </Group>
                </Tooltip>

                <Tooltip label={statLabels['weight']} position="top">
                  <Group align="center">
                    <Text className="pokemon-stats">
                      {(weight ?? 0)} Kg
                    </Text>
                    ⚖️
                  </Group>
                </Tooltip>
              </Group>


              <SimpleGrid mt={24} cols={3}>
                {pokemon?.stats?.map((stats: {
                  base_stat: number;
                  stat: { name: string; };
                }) => {
                  return (
                    <Tooltip key={stats.stat.name} label={statLabels[stats.stat.name]} position="top">
                      <Group align="center">
                        {statIcons[stats.stat.name] ?? <></>}
                        <p>{stats.base_stat}</p>
                      </Group>
                    </Tooltip>
                  );
                })}

              </SimpleGrid>

            </Stack>

          </Group>
        </Paper>
        <Button onClick={() => {
          setSelectedPokemon(pokemonList.find(x => x.pokeId === index));
          return handleModalRelease(releaseSelectedPokemon, navigate);
        }}>Lepaskan
        </Button>
      </Flex>
    </Paper >
  );
};

