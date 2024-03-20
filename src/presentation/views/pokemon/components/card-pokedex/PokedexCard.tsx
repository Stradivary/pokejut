import { usePokemonGetByName } from "@/data/data-source/Pokemon/pokemonDataSource";
import { PokemonState, useSimulator } from "@/domain/use-cases/simulator";
import { pokemonData } from "@/utils/constants";
import { Button, Card, HoverCard, Progress, Stack, Text, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import "./style.scss";

export default function EvolutionCard({
  pokemonName,
  oldPokemon,
}: {
  pokemonName: string;
  oldPokemon?: PokemonState;
}) {
  const [color, setColor] = useState<string | null>("#fff");
  const { data: pokemon } = usePokemonGetByName(pokemonName);

  const { evolveSelectedPokemon } = useSimulator();
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
      const Color = getColorByType(pokemon ? pokemon?.types[0].type.name : "");
      setColor(Color);
    }
  }, [pokemon]);

  return (
    <Stack key={pokemon?.name} miw={180}>
      <HoverCard
        position="right"
        offset={10}
        radius="sm"
      >
        <HoverCard.Target>
          <Stack>
            <Card
              key={pokemon?.name}
              className="card-pokedex"
              style={{
                width: "100%",
                height: 200,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('/svgs/half-pokeball.svg'), radial - gradient(80 % 80 % at 50 % bottom, ${color}, #060e20cc)`,
              }}
            >
              <img
                loading="lazy"
                draggable={false}
                src={
                  pokemon?.sprites.other["official-artwork"].front_default
                    ? pokemon?.sprites.other["official-artwork"].front_default
                    : "/pokenull.png"
                }
                alt="Pokemon"
              />

              <Title order={5} style={{ textAlign: "center" }}>
                {pokemon?.name}
              </Title>
            </Card>
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
            const pokemonData: PokemonState = { ...pokemon };
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
