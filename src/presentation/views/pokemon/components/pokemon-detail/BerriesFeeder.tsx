
import { useBerryGetAll } from "@/domain/data-source/Berries/berryDataSource";
import { useSimulator } from "@/domain/use-cases/simulator";
import { Group, Paper, ScrollArea, Title } from "@mantine/core";
import { useState } from "react";
import { BerryCard } from "./BerryCard";

export const BerriesFeeder = () => {
  const { data } = useBerryGetAll({
    limit: 100,
    offset: 0,
  });
  const [selectedBerry, setSelectedBerry] = useState<string>("");
  const { feedPokemon, selectedPokemonId } = useSimulator();
  return (
    <Paper p={10} mih={400}>
      <Title order={4} mb={8}>Berries Feeder</Title>
      <Paper withBorder radius="lg" p={8} mb={16}>
        <ScrollArea w="100%" h={56} >
          <Group w={"100%"} gap={8} wrap="nowrap" >
            {data?.results?.map((berry: { name: string; }) => {
              return (
                <BerryCard
                  key={berry?.name + "-card"}
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
              feedPokemon(selectedPokemonId ?? "", berryState);
            }}
          />
        )
      }

    </Paper>
  );
};
