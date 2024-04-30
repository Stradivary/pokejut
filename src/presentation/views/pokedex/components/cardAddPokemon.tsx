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
  Tooltip
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback, useMemo } from "react";

import { addSelectedPokemon, useEvolutionChainByPokemonName } from "@/domain/use-cases/evolution";
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { PokemonTypeBadge } from "@/presentation/components/pokemonTypeBadge";
import { getColorByType, statLabels } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { getPokemonImage } from "@/utils/image";

export default function CardAddPokemon({
  pokemonName,
  pokemonType,
}: Readonly<{
  pokemonName: string;
  pokemonType?: any[];
}>) {
  const { catchPokemon } = useSimulator();
  const color = useMemo(
    () => getColorByType(pokemonType?.[0] ?? ""),
    [pokemonType]
  );
  // Informasi pokemon diambil untuk mengurangi jumlah request ke API
  // data yang disimpan disini akan digunakan untuk repository saat 
  // datanya di tambahkan ke dalam daftar pokemon
  const { data: pokemon, isSuccess: pokeDone } = usePokemonGetByName(pokemonName);
  const { data: evolveItem, isSuccess: evoDone } = useEvolutionChainByPokemonName(pokemon?.name);

  const navigate = useNavigate();

  const selectPokemon = useCallback(() => {
    const success = addSelectedPokemon(pokemon, evolveItem, catchPokemon);
    if (success) {
      notifications.show({
        title: "Pokemon berhasil ditambahkan",
        message: `Pokemon ${pokemon.name} berhasil ditambahkan ke dalam daftar pokemon kamu`,
        color: "blue",
        icon: <img src="/pokeball.png" alt="pokeball" />,
      });
      navigate("/pokemon/selected", {
        unstable_viewTransition: true,
      });
    } else {
      notifications.show({
        title: "Gagal menambahkan pokemon",
        message:
          "Terdapat kesalahan saat menambahkan pokemon, silahkan coba lagi",
        color: "red",
        icon: <img src="/pokeball.png" alt="pokeball" />,
      });
    }
    
  }, [pokemon, evolveItem, navigate, catchPokemon]);

  return (
    <Paper
      className={style.cardAddPokemon}
      style={{
        '--card-background-color': color,
      }}
      mih={600}
      p={16}
    >
      <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 1, lg: 1 }} spacing={16}>
        <Image
          loading="lazy"
          draggable={false}
          className={style.cardPokemonImg}
          src={getPokemonImage(pokemon)}
          fallbackSrc="/pokenull.webp"
          alt={"Selected Pokemon " + pokemon?.name}
        />
        <Stack gap={16}>
          <Text className={style.pokemonName} px={20}>
            {pokemon?.name}
          </Text>
          <Group align="center" justify="center">
            {pokemon?.types?.map(
              (type: { type: { name: string; }; }) => {
                return (
                  <PokemonTypeBadge key={`${pokemon?.name}-${type.type.name}-card`} type={type.type} />
                );
              }
            )}
          </Group>

          <Group gap={16} justify="center" wrap="nowrap">
            <Tooltip label={statLabels['height']} position="top">
              <Group wrap="nowrap" align="center">
                <Text className={style["pokemon-stats"]}>
                  {(pokemon?.height ?? 0)} M
                </Text>
                📏
              </Group>
            </Tooltip>

            <Tooltip label={statLabels['weight']} position="top">
              <Group wrap="nowrap" align="center">
                <Text className={style["pokemon-stats"]}>
                  {(pokemon?.weight ?? 0)} Kg
                </Text>
                ⚖️
              </Group>
            </Tooltip>
          </Group>
        </Stack>
        <Center>
          <Button
            type="button"
            className={style["btn-choose"]}
            variant="gradient"
            disabled={!(pokeDone && evoDone)}
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
