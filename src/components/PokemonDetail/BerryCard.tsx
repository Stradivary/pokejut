import { ActionIcon, Button, Group, Image, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { useBerryGetByName } from "../../repositories/berries";
import { useItemGetByName } from "../../repositories/items";
import { BerryState } from "@/services/simulator";


export const BerryCard = ({ name, selected, onClick, detailed }: { name: string; selected?: boolean; onClick?: (berryState: BerryState) => void; detailed?: boolean; }) => {
  const { data: berry } = useBerryGetByName(name);
  const { data } = useItemGetByName(berry?.item?.name);

  return detailed ? (
    <Paper   >
      <Text mb={16} className="pokemon-stats">Berries Detail</Text>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Group>
          <Image
            w={32}
            loading="lazy"
            draggable={false}
            src={data?.sprites?.default
              ? data?.sprites?.default
              : ""} />
          <Stack my={24}>
            <Text>{berry?.name}</Text>
            <Group align="center">
              <Text className="pokemon-stats">
                {berry?.firmness?.name}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Button onClick={() => onClick?.(berry as BerryState)}>Feed Pokemon</Button>

      </SimpleGrid>
    </Paper>
  ) : (
    <ActionIcon variant={selected ? "filled" : "light"} onClick={() => onClick?.(data as BerryState)}>
      <Image
        loading="lazy"
        draggable={false}
        src={data?.sprites?.default
          ? data?.sprites?.default
          : "pokenull.png"} />
    </ActionIcon>
  );
};
