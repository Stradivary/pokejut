import { useSimulator } from "@/domain/use-cases/simulator";
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
import { useCallback, useMemo } from "react";

import { EvolutionChain } from "@/data/entities/evolution";
import { useEvolutionChainByPokemonName } from "@/domain/use-cases/evolution";
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { getColorByType } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

function mapEvolutionChain(data: any): EvolutionChain {
  return {
    species: data.species.name,
    evolves_to: data.evolves_to.map((evolution: any) => mapEvolutionChain(evolution))
  };
}

export default function CardAddPokemon({
  pokemonName,
  pokemonType,
}: Readonly<{
  pokemonName: string;
  pokemonType?: any[];
}>) {
  const { catchPokemon } = useSimulator();
  const color = useMemo(() => getColorByType(pokemonType?.[0] ?? ""), [pokemonType]);

  const { data: pokemon } = usePokemonGetByName(pokemonName);

  const { data: evolveItem } = useEvolutionChainByPokemonName(pokemon?.name);

  const navigate = useNavigate();

  const selectPokemon = useCallback(() => {
    if (pokemon && evolveItem) {
      notifications.show({
        title: "Pokemon berhasil ditambahkan",
        message: `Pokemon ${pokemon.name} berhasil ditambahkan ke dalam daftar pokemon kamu`,
        color: "blue",
        icon: <img src="/pokeball.png" alt="pokeball" />,
      });
      const poke = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: {
          front_default: pokemon.sprites.front_default,
          back_default: "",
          other: {
            "dream_world": {
              front_default: pokemon.sprites.other["dream_world"].front_default
            },
            "home": {} as any
          }
        },
        species: pokemon.species,
      };

      const evolves_to = mapEvolutionChain(evolveItem?.chain);


      catchPokemon({ ...poke, evolves_to });
      navigate("/pokemon/selected", {
        unstable_viewTransition: true,
      });
    } else {
      notifications.show({
        title: "Gagal menambahkan pokemon",
        message: "Terdapat kesalahan saat menambahkan pokemon, silahkan coba lagi",
        color: "red",
        icon: <img src="/pokeball.png" alt="pokeball" />,
      });
    }

  }, [pokemon, evolveItem, navigate, catchPokemon]);

  return (
    <Paper
      className={style.cardAddPokemon}
      style={{
        backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
        backgroundRepeat: "no-repeat",
      }}
      mih={600}
      p={16}
    >
      <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 1, lg: 1 }} spacing={16}>
        <Image
          loading="lazy"
          style={{
            width: "100%",
            minWidth: 300,
            height: 300,
            objectFit: "contain",
          }}
          draggable={false}
          className={style.cardPokemonImg}
          src={
            pokemon?.sprites.other["dream_world"].front_default
              ? pokemon?.sprites.other["dream_world"].front_default
              : pokemon?.sprites.front_default
          }
          fallbackSrc="/pokenull.webp"
          alt={"Selected Pokemon " + pokemon?.name}
        />
        <Stack gap={16}>
          <Text className={style.pokemonName} px={20}>
            {pokemon?.name}
          </Text>
          <Group align="center" justify="center">
            {pokemon?.types?.map(
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
              📏
            </Group>

            <Group wrap="nowrap">
              <Text className={style["pokemon-stats"]}>
                {(pokemon?.weight ?? 0)} Kg
              </Text>
              🏋️
            </Group>
          </Group>

        </Stack>
        <Center>
          <Button
            type="button"
            className={style["btn-choose"]}
            variant="gradient"
            onClick={selectPokemon}
            gradient={{ from: "dark", to: color ?? "blue", deg: 350 }}
          >
            I Choose You
          </Button>
        </Center>
      </SimpleGrid>
    </Paper>
  );
}
