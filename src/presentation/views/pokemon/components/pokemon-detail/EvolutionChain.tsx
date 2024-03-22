import { useSimulator } from "@/domain/use-cases/simulator";
import { Paper, SimpleGrid, Title } from "@mantine/core";
import { useEvolutionChain } from "./useEvolutionChain";
import { EvolveCard } from "./EvolveCard";

export const EvolutionChainPage = ({ pokemonId }) => {


  const { pokemonList } = useSimulator();
  const pokemonState = pokemonList.find((poke) => poke.pokeId === pokemonId);
  const { nextEvolutionChain } = useEvolutionChain(pokemonState);
  return (
    <Paper p="md"  >
      <Title order={3} mt="lg">
        Evolution Chain
      </Title>
      <SimpleGrid cols={{ base: 5 }}>
        {nextEvolutionChain?.evolves_to?.map((pokemon) => (
          <EvolveCard
            key={"evolve-card-" + pokemon?.species?.name + "-" + pokemonId}
            selectedPokemon={pokemonState}
            evolveItem={pokemon}
          />
        ))}
      </SimpleGrid>
    </Paper>
  );
};


