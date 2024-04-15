import { useSimulator } from "@/domain/use-cases/simulator";
import { Alert, Paper, SimpleGrid, Title } from "@mantine/core";
import EvolutionCard from "../evolution-card";
import { useEvolutionChain } from "./useEvolutionChain";

export const EvolutionChainPage = ({ pokemonId }) => {

  const { selectedPokemon } = useSimulator();
  const pokemonState = selectedPokemon();
  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  return (
    <Paper p="md" miw={200} >
      <Title order={2} mt="lg">
        Evolution Chain
      </Title>
      <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 5, xl: 6 }}>
        {nextEvolutionChain?.evolves_to?.map((pokemon) => (
          <EvolutionCard
            key={"evolve-card-" + pokemon?.species + "-" + pokemonId}
            pokemonName={pokemon?.species}
            oldPokemon={pokemonState}
          />
        ))}

        {
          nextEvolutionChain?.evolves_to?.length === 0 && <Alert>
            Pokemon tidak bisa berevolusi
          </Alert>
        }
      </SimpleGrid>
    </Paper>
  );
};


