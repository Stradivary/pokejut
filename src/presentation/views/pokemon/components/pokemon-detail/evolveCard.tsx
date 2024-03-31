import { EvolutionChain } from "@/data/entities/evolution";
import { PokemonState } from '@/domain/use-cases/simulator/pokemonState';
import { Stack } from "@mantine/core";
import EvolutionCard from "../card-pokedex/pokedexCard";


export function EvolveCard({
  evolveItem, selectedPokemon,
}: Readonly<{
  selectedPokemon?: PokemonState;
  evolveItem: EvolutionChain;
}>) {

  return (
    <Stack w={100}>
      <EvolutionCard
        pokemonName={evolveItem?.species}
        oldPokemon={selectedPokemon} />
    </Stack>
  );
}
