
import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { getColorByType } from "@/utils/constants";
import { Button, HoverCard, Image, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import "./style.scss";
import { usePokemonGetByName } from "@/domain/use-cases/pokemon";

export default function EvolutionCard({
  pokemonName,
  oldPokemon,
}: Readonly<{
  pokemonName: string;
  oldPokemon?: PokemonState;
}>) {
  const [color, setColor] = useState<string | undefined>("#fff");
  const { data: pokemon } = usePokemonGetByName(pokemonName);

  const { evolveSelectedPokemon } = useSimulator();

  const weightPercentage = useMemo(() => {
    const pokemonWeight = oldPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = pokemon?.weight ?? 8000;
    return pokemonWeight < nextEvolutionPokemonWeight
      ? (pokemonWeight / nextEvolutionPokemonWeight) * 100
      : 100;
  }, [oldPokemon, pokemon]);

  const canEvolve = useMemo(() => {
    const pokemonWeight = oldPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = pokemon?.weight ?? 8000;
    return pokemonWeight >= nextEvolutionPokemonWeight;
  }, [oldPokemon, pokemon]);

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);
      const Color = getColorByType(pokemon ? pokemon?.types?.[0]?.type?.name : "");
      setColor(Color);
    }
  }, [pokemon]);

  return (
    <Stack key={pokemon?.name} miw={180}>
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
                src={
                  pokemon?.sprites.other["dream_world"].front_default
                    ? pokemon?.sprites.other["dream_world"].front_default
                    : pokemon?.sprites.front_default
                }
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
            evolveSelectedPokemon(pokemonData);
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
