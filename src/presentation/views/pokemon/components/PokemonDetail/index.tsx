import {
  Badge,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Barbell, Ruler } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { BerriesFeeder } from "./BerriesFeeder";
import styles from "./style.module.scss";
import { pokemonData } from "@/utils/constants";
import { useSimulator, PokemonState } from "@/domain/useCases/simulator";
import { usePokemonGetEvolutionChain, usePokemonGetSpecies } from "@/data/dataSource/Evolution/evolutionDataSource";
import { findNextEvolution } from "@/domain/useCases/evolution/useEvolutionChain";

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

export const PokemonDetail: React.FC = () => {
  const { selectedPokemon: pokemonState } = useSimulator();
  const { data: pokemonSpecies } = usePokemonGetSpecies(pokemonState?.name);
  const { data: evolveItem } = usePokemonGetEvolutionChain(
    pokemonSpecies?.evolution_chain?.url?.replace("https://pokeapi.co/api/v2/evolution-chain/", "")?.replace("/", "")
  );
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
          viewTransitionName: "pokemon-card",
        }}
      >
        <Group align="center" mx="auto">
          <Image
            loading="lazy"
            draggable={false}
            className={styles["card-pokemon-img"]}
            style={{
              viewTransitionName: "pokemon-image",
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

            <Text>
              Evolves to:{" "}
              {findNextEvolution(evolveItem, pokemon?.name ?? "") ?? "None"}
            </Text>
          </Stack>
        </Group>
      </Paper>

      <BerriesFeeder />
      <Stack>
        <Title order={5} style={{ textAlign: "center" }}>
          Your last fed berries
        </Title>
        <Group>
          {
            fedBerries && fedBerries.length > 0 ? (
              fedBerries.map((berry) => {
                return (<Badge color={firmnesColor[berry]}>{berry.replace("-", " ")}</Badge>
                );
              })
            ) : (
              <Text>No berries fed</Text>
            )
          }
        </Group>
      </Stack>
    </SimpleGrid>
  );
};
