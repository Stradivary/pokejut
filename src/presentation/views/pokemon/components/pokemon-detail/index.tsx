import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { firmnesColor, getColorByType, statIcons, statLabels } from "@/utils/constants";
import {
  Badge,
  Group,
  Image,
  Paper,
  Popover,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { BerriesFeeder } from "./berriesFeeder";
import styles from "./style.module.scss";



export const PokemonDetail: React.FC<{ pokemonId: string; }> = ({ pokemonId }) => {

  const { pokemonList } = useSimulator();
  const pokemonState = pokemonList.find((poke) => poke.pokeId === pokemonId);
  const color = getColorByType(pokemonState?.types?.[0]?.type?.name ?? "") ?? "#fff";
  const { weight, fedBerries, ...pokemon } = pokemonState ?? ({} as PokemonState);


  return (
    <SimpleGrid px="md" cols={{ base: 1, md: 2 }}>
      <Paper
        className={styles["card-pokemon"]}
        style={{
          marginTop: 40,
          minHeight: 400,
          backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
          viewTransitionName: `pokemon-card-${pokemonId}`
        }}
      >
        <Group justify="space-evenly" mx="auto">
          <Image
            loading="lazy"
            draggable={false}
            className={styles["card-pokemon-img"]}
            style={{
              viewTransitionName: `pokemon-image-${pokemonId}`,
            }}
            src={
              pokemon?.sprites?.other?.["dream_world"]?.front_default
                ? pokemon?.sprites?.other?.["dream_world"]?.front_default
                : pokemon?.sprites?.other?.home?.front_default
            }
            fallbackSrc="/pokenull.webp"
            alt="Selected Pokemon"
          />
          <Stack my={16} align="center" mx="auto">
            <Text className={styles["card-pokemon-name"]}>{pokemon?.name}</Text>
            <Group align="center">
              {pokemon?.types?.map(
                (type: { type: { name: string; }; }) => {
                  return (
                    <Popover key={type?.type?.name} position="top" withArrow>
                      <Popover.Target>
                        <Image
                          loading="lazy"
                          draggable={false}
                          w={40}
                          h={40}
                          src={`/types/${type.type.name}.svg`}
                          alt=""
                        />
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Text>{type.type.name}</Text>
                      </Popover.Dropdown>
                    </Popover>
                  );
                }
              )}
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
                      <span>{stats.base_stat}</span>
                    </Group>
                  </Tooltip>
                );
              })}

            </SimpleGrid>
          </Stack>
        </Group>
      </Paper>

      <BerriesFeeder />
      <Stack>
        <Title order={5} style={{ textAlign: "center" }}>
          Berry Terakhir yang Diberikan
        </Title>
        <ScrollArea style={{ height: 64, width: "100%" }}>
          <Group w="100%">
            {
              fedBerries?.length > 0 && (
                fedBerries?.slice(-5).reverse().map((berry, index) => {
                  return (<Badge key={
                    `${berry}-badge-${index}`
                  } color={firmnesColor[berry]}>{berry.replace("-", " ")}</Badge>
                  );
                })
              )}
            {fedBerries?.length === 0 && (
              <Text>
                Belum ada berry yang diberikan
              </Text>)}
          </Group>
        </ScrollArea>
      </Stack>
    </SimpleGrid>
  );
};
