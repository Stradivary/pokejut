import { PokemonTypeBadge } from "@/presentation/components/pokemonTypeBadge";
import { statIcons, statLabels } from "@/utils/constants";
import { getPokemonImage } from "@/utils/image";
import { Button, Flex, Group, Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { usePokemonSelectCardViewModel } from "./usePokemonSelectCardViewModel";
import { Tooltip } from '@/presentation/components/tooltip';

import styles from "./style.module.scss";

export const CardPokemonSelect: React.FC<{ pokemonName: string; index: string; weight: any; }> = ({ pokemonName, index, weight }) => {
  const binding = usePokemonSelectCardViewModel(pokemonName, index);

  return (
    <Paper
      className={styles["card-pokemon"]}
      withBorder
      style={{
        '--selected-color': `${binding.color}`,
        viewTransitionName: `pokemon-card-${index}`
      }}
    >
      <Flex direction={{
        base: "column",
        lg: "row",
        xs: "column"
      }}>
        <Paper
          style={{
            flex: 1,
          }}
          withBorder={false}
          shadow="0"
          component={Link}
          unstable_viewTransition
          to={`./selected`} onClick={binding.onSelectClick} >

          <Group align="stretch" >
            <Image
              loading="lazy"
              draggable={false}
              className={styles["card-pokemon-img"]}
              style={{
                viewTransitionName: `pokemon-image-${index}`
              }}
              src={getPokemonImage(binding.pokemon)}
              fallbackSrc="/pokenull.webp"
              alt="Selected Pokemon"
            />
            <Stack
              my={24} align="center" mx="auto"
            >
              <Text className={styles["card-pokemon-name"]}>{binding.pokemon?.name}</Text>
              <Group align="center">
                {binding.pokemonTypes?.map((type: { type: { name: string; }; }) => {
                  return <PokemonTypeBadge key={`${pokemonName}-${type.type.name}-card`} type={type.type} />;
                })}
              </Group>
              <Group>
                <Tooltip label={statLabels['height']} position="top">
                  <Group align="center">
                    <Text className="pokemon-stats">
                      {(binding.pokemon?.height ?? 0)} M
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
                {binding.pokemonStats?.map((stats: {
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
        <Button onClick={binding.onReleaseClick}>Lepaskan</Button>
      </Flex>
    </Paper >
  );
};


