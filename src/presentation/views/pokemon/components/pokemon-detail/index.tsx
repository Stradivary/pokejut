import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { pokemonData } from "@/utils/constants";
import {
  Badge,
  Group,
  Image,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Barbell, Ruler } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
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

const firmnesColor: Record<string, string> = {
  "very-soft": "blue",
  soft: "green",
  hard: "yellow",
  "very-hard": "orange",
  "super-hard": "red",
};

export const PokemonDetail: React.FC<{ pokemonId: string; }> = ({ pokemonId }) => {
  // const { data: pokemonSpecies } = usePokemonGetSpecies(pokemonState?.name);
  // const { data: evolveItem } = usePokemonGetEvolutionChain(
  //   pokemonSpecies?.evolution_chain?.url?.replace("https://pokeapi.co/api/v2/evolution-chain/", "")?.replace("/", "")
  // );

  const { pokemonList } = useSimulator(); 
  const pokemonState = pokemonList.find((poke) => poke.pokeId === pokemonId);
  const [color, setColor] = useState<string | undefined>("#fff");
  const { weight, fedBerries, ...pokemon } =
    pokemonState ?? ({} as PokemonState);
  useEffect(() => {
    const Color =
      getColorByType(pokemonState?.types?.[0]?.type?.name ?? "") ?? undefined;
    setColor(Color);
  }, [pokemonState]);

  return (
    <SimpleGrid px="md" cols={{ base: 1, md: 2 }}>
      <Paper

        className={styles["card-pokemon"]}
        style={{
          marginTop: 40,
          backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
          viewTransitionName: `pokemon-card-${pokemonId}`
        }}
      >
        <Group align="center" mx="auto">
          <Image
            loading="lazy"
            draggable={false}
            className={styles["card-pokemon-img"]}
            style={{
              viewTransitionName: `pokemon-image-${pokemonId}`,
            }}
            src={
              pokemon?.sprites?.other?.["official-artwork"]?.front_default
                ? pokemon?.sprites?.other?.["official-artwork"]?.front_default
                : pokemon?.sprites?.other?.home?.front_default
                  ? pokemon?.sprites?.other?.home?.front_default
                  : "pokenull.png"
            }
            alt="Pokémon selecionado"
          />
          <Stack my={24} align="center" mx="auto">
            <Text className={styles["card-pokemon-name"]}>{pokemon?.name}</Text>
            <Group align="center">
              {pokemon?.types?.map(
                (type: { type: { name: string; }; }, i: number) => {
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
                }
              )}
            </Group>
            <Group>
              <Group align="center">
                <Text className="pokemon-stats">
                  {(pokemon?.height ?? 0)} M
                </Text>
                <Ruler size={24} weight="duotone" />
              </Group>

              <Group align="center">
                <Text className="pokemon-stats">{(weight ?? 0)} Kg</Text>
                <Barbell size={24} weight="duotone" />
              </Group>
            </Group>

          </Stack>
        </Group>
      </Paper>

      <BerriesFeeder />
      <Stack>
        <Title order={5} style={{ textAlign: "center" }}>
          Your last fed berries
        </Title>
        <ScrollArea style={{ height: 80, width: "100%" }}>
          <Group w="100%">
            {
              fedBerries && fedBerries.length > 0 ? (
                fedBerries?.slice(
                  fedBerries.length > 5 ? fedBerries.length - 5 : 0
                ).reverse().map((berry) => {
                  return (<Badge color={firmnesColor[berry]}>{berry.replace("-", " ")}</Badge>
                  );
                })
              ) : (
                <Text>No berries fed</Text>
              )
            }
          </Group>
        </ScrollArea>
      </Stack>
    </SimpleGrid>
  );
};
