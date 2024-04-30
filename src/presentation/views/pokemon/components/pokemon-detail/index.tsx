import { PokemonTypeBadge } from "@/presentation/components/pokemonTypeBadge";
import { firmnesColor, statIcons, statLabels } from "@/utils/constants";
import { getPokemonImage } from "@/utils/image";
import {
  Badge,
  Group,
  Image,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { Tooltip } from '@/presentation/components/tooltip';
import { BerriesFeeder } from "./berriesFeeder";
import styles from "./style.module.scss";
import { usePokemonDetailViewModel } from "./usePokemonDetailViewModel";


export const PokemonDetail: React.FC<{
  pokemonId: string;
  readyToEvolve: { [key: string]: boolean; };
}> = ({ pokemonId, readyToEvolve }) => {

  const binding = usePokemonDetailViewModel(pokemonId, readyToEvolve);
  return (
    <SimpleGrid px="md" cols={{ base: 1, md: 2 }}>
      <Paper
        className={styles["card-pokemon"]}
        style={{
          '--selected-color': `${binding.color}`,

          viewTransitionName: `pokemon-card-${pokemonId}`
        }}
      >
        <Group justify="space-evenly" mx="auto">
          <Image
            loading="lazy"
            draggable={false}
            className={styles["card-pokemon-img"]}
            style={{ viewTransitionName: `pokemon-image-${pokemonId}` }}
            src={getPokemonImage(binding.pokemon)}
            fallbackSrc="/pokenull.webp"
            alt="Selected Pokemon"
          />
          <Stack my={16} align="center" mx="auto">
            <Text className={styles["card-pokemon-name"]}>{binding.pokemon?.name}</Text>
            <Group align="center">
              {binding.pokemon?.types?.map((type: { type: { name: string; }; }) => {
                return (
                  <PokemonTypeBadge key={`${binding.pokemon?.name}-${type.type.name}-card`} type={type.type} />
                );
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
                    {(binding.weight ?? 0)} Kg
                  </Text>
                  ⚖️
                </Group>
              </Tooltip>
            </Group>

            <SimpleGrid mt={24} cols={3}>
              {binding.pokemon?.stats?.map((stats: {
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

      <BerriesFeeder feedPokemon={binding.feedPokemon} selectedPokemonId={binding.selectedPokemonId} canFeedBerry={binding.canFeedBerry} />

      <Stack>
        <Title order={5} style={{ textAlign: "center" }}>
          Berry Terakhir yang Diberikan
        </Title>
        <ScrollArea style={{ height: 64, width: "100%" }}>
          <Group w="100%">
            {binding.fedBerries?.length !== 0 && binding.lastFeedBerries
              .map((berry, index) => (
                <Badge key={`${berry}-badge-${index}`}
                  color={firmnesColor[berry]}>{berry.replace("-", " ")}</Badge>
              ))
            }
            {binding.fedBerries?.length === 0 && (
              <Text>
                Belum ada berry yang diberikan
              </Text>)}
          </Group>
        </ScrollArea>
      </Stack>
    </SimpleGrid>
  );
};
