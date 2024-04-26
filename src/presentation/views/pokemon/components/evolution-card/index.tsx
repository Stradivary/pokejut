
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";
import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { getColorByType } from "@/utils/constants";
import { getPokemonImage } from "@/utils/image";
import { Button, HoverCard, Image, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

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
    <Stack key={pokemon?.name} miw={180} mih={100}>
      <HoverCard
        offset={10}
        radius="sm"
      >
        <HoverCard.Target>
          <Stack>
            <Paper
              key={pokemon?.name}
              className="card-pokedex"
              style={{
                position: 'relative',
                width: "100%",
                height: 200,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('/svgs/half-pokeball.svg'), radial-gradient(80% 80% at 50% bottom, ${color}, #060e20cc)`,
              }}
            >
              <Image
                style={{ width: "80%" }}
                loading="lazy"
                draggable={false}
                src={getPokemonImage(pokemon)}
                fallbackSrc="/pokenull.webp"
                alt="Pokemon"
              />

              <Title order={5} style={{ textAlign: "center", position: "absolute", bottom: 0, left: 0, right: 0 }}>
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
