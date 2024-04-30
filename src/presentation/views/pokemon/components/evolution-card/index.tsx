
import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { getPokemonImage } from "@/utils/image";
import { Button, HoverCard, Image, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import styles from "./style.module.scss";
import { useEvolutionCardViewModel } from "./useEvolutionCardViewModel";

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

  const binding = useEvolutionCardViewModel(pokemonName, oldPokemon, readyToEvolve, setReadyToEvolve);

  return (
    <Stack key={binding?.pokemonName} className={styles.root} >
      <HoverCard
        offset={10}
        radius="sm"
      >
        <HoverCard.Target>
          <Stack>
            <Paper
              key={binding?.pokemonName}
              className={styles["card-pokedex"]}
              style={{
                '--selected-color': `${binding?.color}`,
              }}
            >
              <Image
                className={styles["card-pokemon-img"]}
                loading="lazy"
                draggable={false}
                src={getPokemonImage(binding?.pokemon)}
                fallbackSrc="/pokenull.webp"
                alt="Pokemon"
              />

              <Title order={5} className={styles["card-title"]}>
                {binding?.pokemonName}
              </Title>
            </Paper>
            <Progress value={binding?.weightPercentage} />
          </Stack>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Stack>
            <Text>Bobot diperlukan untuk evolusi: {binding?.pokemon?.weight}kg</Text>
            <Text>Bobot saat ini: {oldPokemon?.weight}kg</Text>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
      {binding.canEvolve && (
        <Button
          variant="gradient"
          onClick={() => {
            const pokemonData: PokemonState = { ...oldPokemon, ...binding?.pokemon };
            binding.evolveSelectedPokemon(pokemonData, binding.navigate);
          }}
        >
          Evolusi ke <br />
          {binding?.pokemonSpecies}
        </Button>
      )}
    </Stack>
  );
}
