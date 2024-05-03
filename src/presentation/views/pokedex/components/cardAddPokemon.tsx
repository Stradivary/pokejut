import { useSimulator } from "@/domain/use-cases/simulator";
import {
  Button,
  Center,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text
} from "@mantine/core";

import { Tooltip } from '@/presentation/components/tooltip';
import { notifications } from "@mantine/notifications";
import { useCallback, useMemo } from "react";

import { addSelectedPokemon, useEvolutionChainByPokemonName } from "@/domain/use-cases/evolution";
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { PokemonTypeBadge } from "@/presentation/components/pokemonTypeBadge";
import { getColorByType, statLabels } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { getPokemonImage } from "@/utils/image";
import { PokemonEvolution } from "@/data/entities/evolution";

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
  const { data: pokemonDetail, isSuccess: pokeDone } = usePokemonGetByName(pokemonName);
  const { data: evolveItem, isSuccess: evoDone } = useEvolutionChainByPokemonName(pokemonDetail?.name);

  const navigate = useNavigate();

  const selectPokemon = useCallback(() => {
    const success = addSelectedPokemon(pokemonDetail, evolveItem as PokemonEvolution, catchPokemon);
    if (success) {
      notifications.show({
        title: "Pokemon berhasil ditambahkan",
        message: `Pokemon ${pokemonDetail.name} berhasil ditambahkan ke dalam daftar pokemon kamu`,
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

  }, [pokemonDetail, evolveItem, navigate, catchPokemon]);

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
          src={getPokemonImage(pokemonDetail)}
          fallbackSrc="/pokenull.webp"
          alt={"Selected Pokemon " + pokemonDetail?.name}
        />
        <Stack gap={16}>
          <Text className={style.pokemonName} px={20}>
            {pokemonDetail?.name}
          </Text>
          <Group align="center" justify="center">
            {pokemonDetail?.types?.map(
              (type: { type: { name: string; }; }) => {
                return (
                  <PokemonTypeBadge key={`${pokemonDetail?.name}-${type.type.name}-card`} type={type.type} />
                );
              }
            )}
          </Group>

          <Group gap={16} justify="center" wrap="nowrap">
            <Tooltip label={statLabels['height']} position="top">
              <Group wrap="nowrap" align="center">
                <Text className={style["pokemon-stats"]}>
                  {(pokemonDetail?.height ?? 0)} M
                </Text>
                📏
              </Group>
            </Tooltip>

            <Tooltip label={statLabels['weight']} position="top">
              <Group wrap="nowrap" align="center">
                <Text className={style["pokemon-stats"]}>
                  {(pokemonDetail?.weight ?? 0)} Kg
                </Text>
                ⚖️
              </Group>
            </Tooltip>
          </Group>
        </Stack>
        <Center>
          <Button
            type="button"
            data-testid="select-pokemon"
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
