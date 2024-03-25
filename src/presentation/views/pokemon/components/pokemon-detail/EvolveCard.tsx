import { usePokemonGetByName } from "@/domain/data-source/Pokemon/pokemonDataSource";
import { EvolutionChain } from "@/domain/entities/evolution";
import { useSimulator } from "@/domain/use-cases/simulator";
import { PokemonState } from '@/domain/use-cases/simulator/PokemonState';
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EvolutionCard from "../card-pokedex/PokedexCard";


export function EvolveCard({
  evolveItem, selectedPokemon,
}: {
  selectedPokemon?: PokemonState;
  evolveItem: EvolutionChain;
}) {

  return (
    <Stack w={100}>
      <EvolutionCard
        pokemonName={evolveItem?.species}
        oldPokemon={selectedPokemon} />
    </Stack>
  );
}
