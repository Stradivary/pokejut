
import { useBerryGetAll } from "@/data/dataSource/Berries/berryDataSource";
import { useSimulator } from "@/domain/useCases/simulator";
import { Group, Paper, ScrollArea, Title } from "@mantine/core";
import { useState } from "react";
import { BerryCard } from "./BerryCard";

export const BerriesFeeder = () => {
  const { data } = useBerryGetAll({
    limit: 100,
    offset: 0,
  });
  const [selectedBerry, setSelectedBerry] = useState<string>("");
  const { feedPokemon, selectedPokemon: pokemonState } = useSimulator();
  return (
    <Paper p={10}>
      <Title order={4} mb={8}>Berries Feeder</Title>
      <Paper withBorder radius="lg" p={8} mb={16}>
        <ScrollArea w="100%" h={56} >
          <Group w={"100%"} gap={8} wrap="nowrap" >
            {data?.results?.map((berry: { name: string; }) => {
              return (
                <BerryCard
                  name={berry?.name}
                  selected={berry?.name === selectedBerry}
                  detailed={false}
                  onClick={() => {
                    if (berry?.name === selectedBerry) {
                      return setSelectedBerry("");
                    }
                    return setSelectedBerry(berry?.name);
                  }}
                />
              );
            })}
          </Group>
        </ScrollArea>
      </Paper>
      {
        selectedBerry !== "" && (
          <BerryCard
            name={selectedBerry}
            detailed
            onClick={(berryState) => {
              feedPokemon(pokemonState?.pokeId ?? "", berryState);
            }}
          />
        )
      }

    </Paper>
  );
};
