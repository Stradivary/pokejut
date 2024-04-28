
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { getColorByType } from "@/utils/constants";
import { getPokemonImage } from "@/utils/image";
import { Button, HoverCard, Image, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export default function EvolutionCard({
  pokemonName,
  oldPokemon,
  readyToEvolve,
  setReadyToEvolve,
}: Readonly<{
  pokemonName: string;
  oldPokemon?: PokemonState;
  readyToEvolve: { [key: string]: boolean; };
  setReadyToEvolve: (value: { [key: string]: boolean; }) => void;
}>) {

  const { data: pokemon } = usePokemonGetByName(pokemonName);
  const color = getColorByType(pokemon ? pokemon?.types?.[0]?.type?.name : "#fff");

  const { evolveSelectedPokemon } = useSimulator();

  const weightPercentage = useMemo(() => {
    const pokemonWeight = oldPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = pokemon?.weight ?? 80000;
    return pokemonWeight < nextEvolutionPokemonWeight
      ? (pokemonWeight / nextEvolutionPokemonWeight) * 100 : 100;
  }, [oldPokemon, pokemon]);

  const canEvolve = useMemo(() => {
    const pokemonWeight = oldPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = pokemon?.weight ?? 80000;
    return pokemonWeight >= nextEvolutionPokemonWeight;
  }, [oldPokemon, pokemon]);

  const navigate = useNavigate();

  if (canEvolve && !readyToEvolve[pokemonName] && pokemonName) {
    setReadyToEvolve({ ...readyToEvolve, [pokemonName]: true });
  }

  return (
    <Stack key={pokemon?.name} className={styles.root} >
      <HoverCard
        offset={10}
        radius="sm"
      >
        <HoverCard.Target>
          <Stack>
            <Paper
              key={pokemon?.name}
              className={styles["card-pokedex"]}
              style={{
                '--selected-color': `${color}`,
              }}
            >
              <Image
                className={styles["card-pokemon-img"]}
                loading="lazy"
                draggable={false}
                src={getPokemonImage(pokemon)}
                fallbackSrc="/pokenull.webp"
                alt="Pokemon"
              />

              <Title order={5} className={styles["card-title"]}>
                {pokemon?.name}
              </Title>
            </Paper>
            <Progress value={weightPercentage} />
          </Stack>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack>
            <Text>Bobot diperlukan untuk evolusi: {pokemon?.weight}kg</Text>
            <Text>Bobot saat ini: {oldPokemon?.weight}kg</Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
      {canEvolve && (
        <Button
          variant="gradient"
          onClick={() => {
            const pokemonData: PokemonState = { ...oldPokemon, ...pokemon };
            evolveSelectedPokemon(pokemonData, navigate);
          }}
        >
          Evolusi ke
          <br />
          {pokemon?.species.name}
        </Button>
      )}
    </Stack>
  );
}
