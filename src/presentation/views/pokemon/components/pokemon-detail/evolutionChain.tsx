import { useSimulator } from "@/domain/use-cases/simulator";
import { Alert, Paper, SimpleGrid, Title } from "@mantine/core";
import { useEvolutionChain } from "./useEvolutionChain";
import { EvolveCard } from "./evolveCard";
import { PokemonState } from "@/domain/use-cases/simulator/pokemonState";

export const EvolutionChainPage = ({ pokemonId }) => {

  const { selectedPokemon } = useSimulator();
  const pokemonState = selectedPokemon();
  console.log(pokemonState)
  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  return (
    <Paper p="md" miw={200} >
      <Title order={2} mt="lg">
        Evolution Chain
      </Title>
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


