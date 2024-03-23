import { usePokemonGetByName } from "@/domain/data-source/Pokemon/pokemonDataSource";
import { EvolutionChain } from "@/domain/entities/evolution";
import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { Button, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import EvolutionCard from "../card-pokedex/PokedexCard";
import { useNavigate } from "react-router-dom";


export function EvolveCard({
  evolveItem, selectedPokemon,
}: {
  selectedPokemon?: PokemonState;
  evolveItem: EvolutionChain;
}) {
  const navigate = useNavigate();
  const { data: evolvePokemonData } = usePokemonGetByName(
    evolveItem?.name ?? ""
  );
  const [canEvolve, setCanEvolve] = useState<boolean>(false);
  const { evolveSelectedPokemon } = useSimulator();
  useEffect(() => {
    const pokemonWeight = selectedPokemon?.weight ?? 0;
    const nextEvolutionPokemonWeight = evolvePokemonData?.weight ?? 8000;
    if (pokemonWeight >= nextEvolutionPokemonWeight) {
      setCanEvolve(true);
    }
  }, [selectedPokemon, evolvePokemonData]);

  return (
    <Stack w={100}>
      <EvolutionCard
        key={evolveItem?.species?.name + "-evolve-card"}
        pokemonName={evolveItem?.species}
        oldPokemon={selectedPokemon} />
      {canEvolve && (
        <div>
          <Title order={5} mt="lg">
            Pokemon bisa berevolusi!
          </Title>
          <Button
            onClick={() => {
              const pokemonData: PokemonState = { ...evolvePokemonData };
              evolveSelectedPokemon(pokemonData);
              navigate(".", { replace: true });
            }}
          >
            Evolusi ke {evolveItem?.name}
          </Button>
        </div>
      )}
    </Stack>
  );
}
