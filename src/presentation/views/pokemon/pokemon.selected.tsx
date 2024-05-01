import { Box, Button, Center, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { PokemonDetail } from "./components/pokemon-detail";
import { EvolutionChainPage } from "./components/pokemon-detail/evolutionChain";
import { handleModalRelease, usePokemonCollectionViewModel as usePokemonSelectedViewModel } from "./usePokemonSelectedViewModel";
import { CollectionDB, SelectionDB } from "@/domain/use-cases/simulator/usePokemonCollection";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {

  const binding = usePokemonSelectedViewModel();

  return (
    <Box style={{ width: "100%" }} mb={180}>
      <Group m="md" justify="space-between">
        <Button component={Link} to=".." unstable_viewTransition
          onClick={() => {
            SelectionDB.deselect();
          }}>
          Kembali
        </Button>

        <Button onClick={() => handleModalRelease(() => CollectionDB.delete(binding?.selectedPokemon?.pokeId ?? ""), binding.navigate)}>
          Lepaskan Pokemon
        </Button>

      </Group>
      {binding.isNoSelectionFound && (
        <Center mt={120}>Tidak ada pokemon yang dipilih</Center>
      )}
      {binding.selectedPokemon && (
        <>
          <PokemonDetail pokemonId={binding.selectedPokemon.pokeId} readyToEvolve={binding.readyToEvolve} />
          <EvolutionChainPage
            pokemonId={binding.selectedPokemon.pokeId}
            pokemonState={binding.selectedPokemon}
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
