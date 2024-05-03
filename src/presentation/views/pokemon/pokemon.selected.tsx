import { Box, Button, Center, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { PokemonDetail } from "./components/pokemon-detail";
import { EvolutionChainPage } from "./components/pokemon-detail/evolutionChain";
import { handleModalRelease, usePokemonSelectedViewModel } from "./usePokemonSelectedViewModel";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {

  const binding = usePokemonSelectedViewModel();

  return (
    <Box style={{ width: "100%" }} mb={180}>
      <Group m="md" justify="space-between">
        <Button component={Link} to=".." unstable_viewTransition>
          Kembali
        </Button>
        {binding.selectedPokemonId && (
          <Button onClick={() => handleModalRelease(binding.releaseSelectedPokemon, binding.navigate)}>
            Lepaskan Pokemon
          </Button>
        )}
      </Group>
      {binding.isNoSelectionFound && (
        <Center mt={120}>Tidak ada pokemon yang dipilih</Center>
      )}
      {binding.selectedPokemonId && (
        <>
          <PokemonDetail pokemonId={binding.selectedPokemonId} canEvolve={(binding.nextEvolutionChain?.evolves_to ?? []).length > 0} readyToEvolve={binding.readyToEvolve} />
          <EvolutionChainPage
            pokemonId={binding.selectedPokemonId}
            pokemonState={binding.pokemonState}
            nextEvolutionChain={binding.nextEvolutionChain}
            readyToEvolve={binding.readyToEvolve}
            setReadyToEvolve={binding.setReadyToEvolve}
          />
        </>
      )}
    </Box>
  );
}


Component.displayName = "PokedexPokemonPage";
