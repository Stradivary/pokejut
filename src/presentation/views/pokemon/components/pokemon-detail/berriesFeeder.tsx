import { useBerryGetAll } from "@/domain/use-cases/berries";
import {
  ActionIcon,
  Alert,
  Drawer,
  Group,
  Paper,
  ScrollArea,
  Tabs,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { FirmnessTable } from "./firmnessTable";
import { BerryCard } from "./berryCard";
import { BerryCardDetail } from "./berryCardDetail";

export const BerriesFeeder = ({
  feedPokemon, selectedPokemonId, canFeedBerry, canEvolve
}) => {
  const { data } = useBerryGetAll({
    limit: 100,
    offset: 0,
  });
  const [selectedBerry, setSelectedBerry] = useState<string>("");
  const [opened, { open, close }] = useDisclosure(false);

  const createBerryClickHandler = (berryName: string) => {
    return () => {
      if (berryName === selectedBerry) {
        return setSelectedBerry("");
      }
      return setSelectedBerry(berryName);
    };
  };

  return (
    <Paper p={10} mih={80}>
      <Drawer
        opened={opened}
        onClose={close}
        title="Informasi Berry"
        position="bottom"
      >
        <Tabs variant="pills" radius="lg" defaultValue="rules">
          <Tabs.List>
            <Tabs.Tab value="rules">Feeding Rule</Tabs.Tab>
            <Tabs.Tab value="punishment">Feeding Prohibition</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="rules">
            Pokemon growth can be accelerated by feeding them with berries. The
            weight of the Pokemon will increase by this following rule:
            <FirmnessTable modifier={1} />
          </Tabs.Panel>

          <Tabs.Panel value="punishment">
            If you feed the Pokemon with the same berry, the Pokemon will have a
            stomachache and the weight will decrease by the following rule:
            <FirmnessTable modifier={-1} />
          </Tabs.Panel>
        </Tabs>
      </Drawer>

      <Group>
        <Title order={4} mb={8}>
          Beri Makan Berry{" "}
        </Title>
        <ActionIcon
          onClick={open}
          aria-label="Info"
          variant="outline"
          color="gray"
          size="sm"
        >
          i
        </ActionIcon>
      </Group>
      <Paper withBorder radius="lg" p={8} mb={16}>
        <ScrollArea w="100%" h={56}>
          <Group w={"100%"} gap={8} wrap="nowrap">
            {data?.results?.map((berry: { name: string; }) => (
              <BerryCard
                key={berry?.name + "-card"}
                name={berry?.name}
                selected={berry?.name === selectedBerry}
                onClick={createBerryClickHandler(berry?.name)}
              />
            ))}
          </Group>
        </ScrollArea>
      </Paper>
      {selectedBerry !== "" && (
        <BerryCardDetail
          name={selectedBerry}
          onClick={(berryState) => { feedPokemon(selectedPokemonId ?? "", berryState); }}
          disabled={!canFeedBerry}
        />
      )}
      {!canFeedBerry && canEvolve && <Alert mt={10} title="Pokemon Sudah Kenyang">
        Pokemon sudah tidak bisa diberi makan lagi.
      </Alert>}
      {
        !canFeedBerry && !canEvolve && <Alert mt={10} title="Pokemon Sudah Kenyang">
          Pokemon sudah tidak bisa diberi makan lagi. 
        </Alert>
      }
    </Paper>
  );
};
