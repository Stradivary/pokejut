import { EvolutionChain } from "@/domain/use-cases/entities/evolution";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { Stack } from "@mantine/core";
import EvolutionCard from "../card-pokedex/PokedexCard";


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
