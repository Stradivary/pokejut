import {
  Button,
  Center,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Barbell, Ruler } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSimulator } from "@/domain/useCases/simulator";

import { pokemonData } from "@/utils/constants";
import style from "./style.module.scss";
import { usePokemonGetEvolutionChain, usePokemonGetSpecies } from "@/data/dataSource/Evolution/evolutionDataSource";
import { usePokemonGetByName } from "@/data/dataSource/Pokemon/pokemonDataSource";

export default function CardAddPokemon({
  pokemonName,
  visibleType,
}: {
  pokemonName: string;
  visibleType: string;
}) {
  const { addPokemon } = useSimulator();
  const [color, setColor] = useState<string | undefined>("#fff");
  const { data: pokemon } = usePokemonGetByName(pokemonName);

  const { data: pokemonSpecies } = usePokemonGetSpecies(pokemon?.name);

  const { data: evolveItem } = usePokemonGetEvolutionChain(
    pokemonSpecies?.evolution_chain?.url?.replace("https://pokeapi.co/api/v2/evolution-chain/", "")?.replace("/", "")
  );
  
  function getColorByType(pokemonType: string) {
    const foundPokemon = pokemonData.find(
      (pokemon) => pokemon.type === pokemonType
    );
    if (foundPokemon) {
      return foundPokemon.color;
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    if (pokemon) {
      const Color = getColorByType(pokemon ? pokemon.types[0].type.name : "");
      setColor(Color);
    }
  }, [pokemon]);

  if (visibleType !== "" && pokemon) {
    if (!pokemon.types.some(({ type }) => type.name === visibleType)) {
      return <></>;
    }
  }

  // const statIcons: Record<string, ReactNode> = {
  //   hp: <Heartbeat size={24} weight="duotone" alt="hit points" />,
  //   attack: <HandFist size={24} weight="duotone" alt="attack" />,
  //   defense: <ShieldChevron size={24} weight="duotone" alt="defense" />,
  //   'special-attack': <Sword size={24} weight="duotone" alt="special attack" />,
  //   'special-defense': <ShieldPlus size={24} weight="duotone" alt="special defense" />,
  //   speed: <Gauge size={24} weight="duotone" alt="speed" />,
  // };

  return (
    <Paper
      className={style.cardAddPokemon}
      style={{
        backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
        backgroundRepeat: "no-repeat",
      }}
      p={16}
    >
      <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 1, lg: 1 }}>
        <Image
          loading="lazy"
          draggable={false}
          className={style.cardPokemonImg}
          src={
            pokemon?.sprites?.other["official-artwork"].front_default
              ? pokemon?.sprites?.other["official-artwork"].front_default
              : "/pokenull.png"
          }
          alt={"Selected Pokemon " + pokemon?.name}
        />
        <Stack gap={16}>
          <Text className={style.pokemonName} px={20}>
            {pokemon?.name}
          </Text>
          <Group align="center" justify="center">
            {pokemon?.types.map(
              (type: { type: { name: string; }; }, i: number) => {
                return (
                  <Image
                    loading="lazy"
                    key={`${pokemon?.name}-${type.type.name}-${i}`}
                    draggable={false}
                    w={40}
                    src={`/types/${type.type.name}.svg`}
                    alt=""
                  />
                );
              }
            )}
          </Group>
          <Group gap={16} justify="center" wrap="nowrap">
            <Group wrap="nowrap">
              <Text className={style["pokemon-stats"]}>
                {(pokemon?.height ?? 0)} M
              </Text>
              <Ruler size={16} weight="duotone" />
            </Group>

            <Group wrap="nowrap">
              <Text className={style["pokemon-stats"]}>
                {(pokemon?.weight ?? 0)} Kg
              </Text>
              <Barbell size={16} weight="duotone" />
            </Group>
          </Group>

          {/* <SimpleGrid mt={24} cols={3}>
            {pokemon?.stats.map((stats: unknown) => {
              return (
                <Group>
                  {statIcons[stats.stat.name] ?? <></>}
                  <span>{stats.base_stat}</span>
                </Group>
              );
            })}

          </SimpleGrid> */}
        </Stack>
        <Center>
          <Button
            type="button"
            className={style["btn-choose"]}
            variant="gradient"
            onClick={() => {
              if (pokemon) {
                notifications.show({
                  title: "Pokemon berhasil ditambahkan",
                  message: `Pokemon ${pokemon.name} berhasil ditambahkan ke dalam daftar pokemon kamu`,
                  color: "blue",
                  icon: <Image src="/svgs/pokeball.svg" alt="Pokeball" />,
                });
                addPokemon({ ...pokemon, ...evolveItem });
              }
            }}
            gradient={{ from: "dark", to: color ?? "blue", deg: 350 }}
          >
            I Choose You
          </Button>
        </Center>
      </SimpleGrid>
    </Paper>
  );
}
