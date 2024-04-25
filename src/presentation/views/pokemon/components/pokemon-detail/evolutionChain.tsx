import { Alert, Paper, SimpleGrid, Title } from "@mantine/core";
import EvolutionCard from "../evolution-card";

export const EvolutionChainPage = ({ pokemonId, pokemonState, nextEvolutionChain, readyToEvolve, setReadyToEvolve }) => {
  
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
            readyToEvolve={readyToEvolve}
            setReadyToEvolve={setReadyToEvolve}
          />
        ))}

        {
          nextEvolutionChain?.evolves_to?.length === 0 && (
            <Alert>
              Pokemon tidak bisa berevolusi
            </Alert>
          )
        }
      </SimpleGrid>
    </Paper>
  );
};


