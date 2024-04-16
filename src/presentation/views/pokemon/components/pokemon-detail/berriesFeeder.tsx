
import { useBerryGetAll } from "@/domain/use-cases/berries";
import { BerryState, useSimulator } from "@/domain/use-cases/simulator";
import { ActionIcon, Drawer, Group, Paper, ScrollArea, Table, Tabs, Title } from "@mantine/core";
import { useState } from "react";
import { BerryCard } from "./berryCard";
import { useDisclosure, useHotkeys } from "@mantine/hooks";

export const BerriesFeeder = () => {
  const { data } = useBerryGetAll({
    limit: 100,
    offset: 0,
  });
  const [selectedBerry, setSelectedBerry] = useState<string>("");
  const { feedPokemon, selectedPokemonId } = useSimulator();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedBerryState, setSelectedBerryState] = useState<BerryState>();
  useHotkeys([
    ['F', () => feedPokemon(selectedPokemonId ?? "", selectedBerryState as Partial<BerryState>)],
  ]);

  return (
    <Paper p={10} mih={80}>
      <Drawer opened={opened} onClose={close} title="Informasi Berry" position="bottom">
        <Tabs variant="pills" radius="lg" defaultValue="rules">
          <Tabs.List>
            <Tabs.Tab value="rules"  >
              Feeding Rule
            </Tabs.Tab>
            <Tabs.Tab value="punishment"  >
              Feeding Prohibition
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="rules">
            Pokemon growth can be accelerated by feeding them with berries.
            The weight of the Pokemon will increase by this following rule:

            <Table mt={16}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Firmness Berry</Table.Th>
                  <Table.Th>Weight Increase</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {
                  [
                    { firmness: "very-soft", weight: 2 },
                    { firmness: "soft", weight: 3 },
                    { firmness: "hard", weight: 4 },
                    { firmness: "very-hard", weight: 5 },
                    { firmness: "super-hard", weight: 10 },
                    { firmness: "others", weight: 1 }
                  ].map(({ firmness, weight }) => (
                    <Table.Tr key={firmness}>
                      <Table.Td>{firmness}</Table.Td>
                      <Table.Td>+{weight}</Table.Td>
                    </Table.Tr>
                  ))

                }
              </Table.Tbody>
            </Table>
          </Tabs.Panel>

          <Tabs.Panel value="punishment">
            If you feed the Pokemon with the same berry,
            the Pokemon will have a stomachache and the weight will decrease by the following rule:
            <Table mt={16}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Firmness Berry</Table.Th>
                  <Table.Th>Weight Decrease</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {
                  [
                    { firmness: "very-soft", weight: 2 },
                    { firmness: "soft", weight: 3 },
                    { firmness: "hard", weight: 4 },
                    { firmness: "very-hard", weight: 5 },
                    { firmness: "super-hard", weight: 10 },
                    { firmness: "others", weight: 1 }
                  ].map(({ firmness, weight }) => (
                    <Table.Tr key={firmness}>
                      <Table.Td>{firmness}</Table.Td>
                      <Table.Td>-{weight * 2}</Table.Td>
                    </Table.Tr>
                  ))

                }
              </Table.Tbody>
            </Table>
          </Tabs.Panel>

        </Tabs>
      </Drawer>

      <Group>
        <Title order={4} mb={8}>Beri Makan Berry </Title>
        <ActionIcon onClick={open} aria-label="Info" variant="outline" color="gray" size="sm">
          ℹ️
        </ActionIcon>
      </Group>
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
                  onClick={(state) => {
                    if (berry?.name === selectedBerry) {
                      setSelectedBerryState(undefined);
                      return setSelectedBerry("");
                    }
                    setSelectedBerryState(state);
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
