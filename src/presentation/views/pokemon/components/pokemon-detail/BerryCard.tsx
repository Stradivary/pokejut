
import { useBerryGetByName } from "@/data/data-source/Berries/berryDataSource";
import { useItemGetByName } from "@/data/data-source/Items/itemsDataSource";
import { BerryState, berriesGain } from "@/domain/use-cases/simulator";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
const firmnesColor: Record<string, string> = {
  "very-soft": "blue",
  soft: "green",
  hard: "yellow",
  "very-hard": "orange",
  "super-hard": "red",
};
 

export const BerryCard = ({
  name,
  selected,
  onClick,
  detailed,
}: {
  name: string;
  selected?: boolean;
  onClick?: (berryState: BerryState) => void;
  detailed?: boolean;
}) => {
  const { data: berry } = useBerryGetByName(name);
  const { data } = useItemGetByName(berry?.item?.name);

  return detailed ? (
    <Paper>
      <Title order={5} mb={16} className="pokemon-stats">
        Berries Detail
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Paper p={10} withBorder radius="lg">
          <Group gap={20}>
            <Image
              width={64}
              height={64}
              loading="lazy"
              draggable={false}
              src={data?.sprites?.default ? data?.sprites?.default?.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/', '/berries/') : ""}
            />
            <Stack my={24}>
              <Text>{berry?.name}</Text>
              <Badge color={firmnesColor[berry?.firmness?.name ?? ""]}>
                {berry?.firmness?.name?.replace("-", " ")}
              </Badge>
              <Text>
                Berat : {berriesGain[berry?.firmness?.name ?? ""]} kg
              </Text>
            </Stack>
          </Group>
        </Paper>
        <Button onClick={() => onClick?.(berry as BerryState)}>
          Feed Pokemon
        </Button>
      </SimpleGrid>
    </Paper>
  ) : (
    <ActionIcon
      variant={selected ? "filled" : "light"}
      onClick={() => onClick?.(data as BerryState)}
      size="xl"
    >
      <Image
        loading="lazy"
        width={48}
        height={48}
        draggable={false}
        src={data?.sprites?.default ? data?.sprites?.default?.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/', '/berries/') : "pokenull.png"}
      />
    </ActionIcon>
  );
};
