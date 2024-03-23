import { useSimulator } from "@/domain/use-cases/simulator";
import { Alert, Paper, SimpleGrid, Title } from "@mantine/core";
import { useEvolutionChain } from "./useEvolutionChain";
import { EvolveCard } from "./EvolveCard";

export const EvolutionChainPage = ({ pokemonId }) => {


  const { pokemonList } = useSimulator();
  const pokemonState = pokemonList.find((poke) => poke.pokeId === pokemonId);
  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  return (
    <Paper p="md" miw={200} >
      {
        nextEvolutionChain?.evolves_to?.length > 0 && <Title order={2} mt="lg">
          Evolution Chain
        </Title>
      }
      <SimpleGrid cols={{ base: 5 }}>
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


