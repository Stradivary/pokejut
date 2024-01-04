import { Paper, ScrollArea, Text } from "@mantine/core";
import { useState } from "react";
import { useBerryGetAll } from "../../repositories/berries/services";
import usePokemonStore from "../../services/simulator";
import { BerryCard } from "./BerryCard";

export const BerriesFeeder = () => {
  const { data } = useBerryGetAll({
    limit: 100,
    offset: 0,
  });
  const [selectedBerry, setSelectedBerry] = useState<string>("");
  const { feedPokemon } = usePokemonStore();
  return (
    <Paper >
      <Text mb={8}  >Berries Feeder</Text>
      <ScrollArea w="100%">
        {data?.results?.map((berry: { name: string; }) => {
          return (
            <BerryCard name={berry?.name} selected={berry?.name === selectedBerry} onClick={() => setSelectedBerry(berry?.name)} />
          );
        })}
      </ScrollArea>
      <BerryCard name={selectedBerry} detailed onClick={
        () => {
          feedPokemon(data?.results?.find((berry: { name: string; }) => berry?.name === selectedBerry));
        }
      } />
    </Paper>
  );
};
