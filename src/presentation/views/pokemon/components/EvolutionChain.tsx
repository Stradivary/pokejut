import {
  usePokemonGetEvolutionChain,
  usePokemonGetSpecies,
} from "@/data/dataSource/Evolution/evolutionDataSource";
import { usePokemonGetByName } from "@/data/dataSource/Pokemon/pokemonDataSource";
import { EvolutionChain } from "@/domain/entities/Evolution";
import { findEvolutionChain } from "@/domain/useCases/evolution/useEvolutionChain";
import { PokemonState, useSimulator } from "@/domain/useCases/simulator";
import { Button, Paper, SimpleGrid, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import EvolutionCard from "./CardPokedex/PokedexCard";

export const EvolutionChainPage = () => {
  const { selectedPokemon } = useSimulator();

  const { nextEvolutionChain } = useEvolutionChain(selectedPokemon);

  return (
    <Paper p="md">
      <Title order={3} mt="lg">
        Evolution Chain
      </Title>
      <SimpleGrid cols={{ base: 5 }}>
        {nextEvolutionChain?.evolves_to?.map((pokemon) => (
          <EvolveCard
            key={pokemon?.species?.name}
            selectedPokemon={selectedPokemon}
            evolveItem={pokemon}
          />
        ))}
      </SimpleGrid>
    </Paper>
  );
};

const useEvolutionChain = (selectedPokemon?: PokemonState) => {
  const { data: pokemonSpecies } = usePokemonGetSpecies(selectedPokemon?.name);
  const { data: evolveItem } = usePokemonGetEvolutionChain(
    pokemonSpecies?.evolution_chain?.url
      ?.replace("https://pokeapi.co/api/v2/evolution-chain/", "")
      ?.replace("/", "")
  );
  // const { data: evolveItem } = usePokemonGetEvolutionChainByPokemonName(selectedPokemon?.name ?? "");
  const [nextEvolutionChain, setNextEvolutionChain] = useState<
    EvolutionChain | EvolutionChain[]
  >([]);

  useEffect(() => {
    const nextEvolutionChain = findEvolutionChain(
      evolveItem?.chain,
      selectedPokemon?.name ?? ""
    );
    setNextEvolutionChain(nextEvolutionChain);
  }, [evolveItem]);

  return { nextEvolutionChain };
};

export function EvolveCard({
  evolveItem,
  selectedPokemon,
}: {
  selectedPokemon?: PokemonState;
  evolveItem: EvolutionChain;
}) {
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
        pokemonName={evolveItem?.species?.name}
        oldPokemon={selectedPokemon}
      />
      {canEvolve && (
        <div>
          <Title order={5} mt="lg">
            Pokemon bisa berevolusi!
          </Title>
          <Button
            onClick={() => {
              const pokemonData: PokemonState = { ...evolvePokemonData };
              evolveSelectedPokemon(pokemonData);
            }}
          >
            Evolusi ke {evolveItem?.name}
          </Button>
        </div>
      )}
    </Stack>
  );
}