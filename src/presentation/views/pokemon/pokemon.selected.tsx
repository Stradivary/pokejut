import { useSimulator } from "@/domain/use-cases/simulator";
import { Box, Button, Group } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { PokemonDetail } from "./components/pokemon-detail";
import { EvolutionChainPage } from "./components/pokemon-detail/evolutionChain";
import { useEvolutionChain } from "../../../domain/use-cases/evolution/useEvolutionChain";
import { handleModalRelease } from "./pokemonSelectedViewModel";
import { useEffect, useState } from "react";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {
  const { selectedPokemonId, selectedPokemon, releaseSelectedPokemon } = useSimulator();
  const [readyToEvolve, setReadyToEvolve] = useState<{ [key: string]: boolean; }>({});
  const pokemonState = selectedPokemon();
  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  const navigate = useNavigate();

  useEffect(() => {
    if (nextEvolutionChain) {
      nextEvolutionChain?.evolves_to?.forEach((evolution) => {
        if (evolution.species) {
          setReadyToEvolve((prev) => ({ ...prev, [evolution.species]: false }));
        }
      });
    }
  }, [nextEvolutionChain, selectedPokemonId]);

  return (
    <Box style={{ width: "100%" }} mb={180}>
      <Group m="md" justify="space-between">
        <Button component={Link} to=".." unstable_viewTransition>
          Kembali
        </Button>
        {selectedPokemonId && (
          <Button
            onClick={() => {
              handleModalRelease(releaseSelectedPokemon, navigate);
            }}
          >
            Lepaskan Pokemon
          </Button>
        )}
      </Group>
      {(selectedPokemonId === null || selectedPokemonId === undefined) && (
        <div>Not found</div>
      )}
      {selectedPokemonId && (
        <>
          <PokemonDetail pokemonId={selectedPokemonId} readyToEvolve={readyToEvolve} />
          <EvolutionChainPage pokemonId={selectedPokemonId}
            pokemonState={pokemonState} nextEvolutionChain={nextEvolutionChain}
            readyToEvolve={readyToEvolve} setReadyToEvolve={setReadyToEvolve}
          />
        </>
      )}
    </Box>
  );
}

Component.displayName = "PokedexPokemonPage";
