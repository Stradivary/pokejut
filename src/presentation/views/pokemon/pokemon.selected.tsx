import { useSimulator } from "@/domain/use-cases/simulator";
import { Box, Button, Group } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { PokemonDetail } from "./components/pokemon-detail";
import { EvolutionChainPage } from "./components/pokemon-detail/evolutionChain";
import { handleModalRelease } from "./pokemonSelectedViewModel";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {
  const { selectedPokemonId, releaseSelectedPokemon } = useSimulator();

  const navigate = useNavigate();

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
          <PokemonDetail pokemonId={selectedPokemonId} />
          <EvolutionChainPage pokemonId={selectedPokemonId} />
        </>
      )}
    </Box>
  );
}

Component.displayName = "PokedexPokemonPage";
