import { usePokemonGetByName } from "@/data/dataSource/Pokemon/pokemonDataSource";
import { PokemonState, useSimulator } from "@/domain/useCases/simulator";
import { pokemonData } from "@/utils/constants";
import { Button, Card, Progress, Stack, Title, Tooltip } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <Stack>
      <Tooltip
        label={`required weight: ${pokemon?.weight}kg\ncurrent weight: ${oldPokemon?.weight}kg`}
        position="bottom"
      >
        <Stack>
          <Card
            key={pokemon?.name}
            className="card-pokedex"
            style={{
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
      </Tooltip>
      {canEvolve && (
        <Button
          onClick={() => {
            const pokemonData: PokemonState = { ...pokemon };
            evolveSelectedPokemon(pokemonData);
            navigate("..");
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
