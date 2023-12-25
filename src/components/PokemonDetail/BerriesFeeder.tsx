import { Group, Paper, ScrollArea, Text } from "@mantine/core";
import React, { useState } from "react";
import { useBerryGetAll } from "../../repositories/berries/services";
import { BerryCard } from "./BerryCard";
import usePokemonStore from "../../services/simulator";

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
        {data?.results?.map((berry: any) => {
          return (
            <BerryCard name={berry?.name} selected={berry?.name === selectedBerry} onClick={() => setSelectedBerry(berry?.name)} />
          );
        })}
      </ScrollArea>
      <BerryCard name={selectedBerry} detailed onClick={
        () => {
          feedPokemon(data?.results?.find((berry: any) => berry?.name === selectedBerry));
        }
      } />
    </Paper>
  );
};
