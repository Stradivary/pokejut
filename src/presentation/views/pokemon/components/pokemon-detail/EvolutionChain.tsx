import { useSimulator } from "@/domain/use-cases/simulator";
import { Alert, Paper, SimpleGrid, Title } from "@mantine/core";
import { useEvolutionChain } from "./useEvolutionChain";
import { EvolveCard } from "./EvolveCard";
import { PokemonState } from "@/domain/use-cases/simulator/PokemonState";

export const EvolutionChainPage = ({ pokemonId }) => {

  const { pokemonList } = useSimulator();
  const pokemonState = pokemonList.find((poke) => poke.pokeId === pokemonId) ?? ({} as PokemonState);

  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  return (
    <Paper p="md" miw={200} >
      {
        nextEvolutionChain?.evolves_to?.length > 0 && <Title order={2} mt="lg">
          Evolution Chain
        </Title>
      }
      <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6 }}>
        {nextEvolutionChain?.evolves_to?.map((pokemon) => (
          <EvolveCard
            key={"evolve-card-" + pokemon?.species?.name + "-" + pokemonId}
            selectedPokemon={pokemonState}
            evolveItem={pokemon}
          />
        ))}

        {
          nextEvolutionChain?.evolves_to?.length === 0 && <Alert title="Evolution Chain">
            Pokemon tidak bisa berevolusi
          </Alert>
        }
      </SimpleGrid>
    </Paper>
  );
};


