
import { useBerryGetByName } from "@/domain/use-cases/berries";
import { useItemGetByName } from "@/domain/use-cases/items";
import { BerryState } from "@/domain/use-cases/simulator";
import { berriesGain, firmnesColor } from "@/utils/constants";
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


export const BerryCardDetail = ({
  name,
  onClick,
  disabled,
}: {
  name: string;
  onClick?: (berryState: BerryState) => void;
  disabled?: boolean;
}) => {
  const { data: berry } = useBerryGetByName(name);
  const { data } = useItemGetByName(berry?.item?.name);

  return (
    <Paper>
      <Title order={5} mb={10} className="pokemon-stats">
        Berries Detail
      </Title>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Paper p={10} withBorder radius="lg">
          <Group gap={16}>
            <Image
              w={64}
              h={64}
              loading="lazy"
              draggable={false}
              fallbackSrc="/pokeball.png"
              src={
                data?.sprites?.default ? data?.sprites?.default?.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/', '/berries/') : ""}

            />
            <Stack my={10}>
              <Text tt="capitalize">{berry?.name}</Text>
              <Badge color={firmnesColor[berry?.firmness?.name ?? ""]}>
                {berry?.firmness?.name?.replace("-", " ")}
              </Badge>
              <Text>
                Berat : {berriesGain[berry?.firmness?.name ?? ""]} kg
              </Text>
            </Stack>
          </Group>
        </Paper>
        <Button onClick={() => onClick?.(berry as BerryState)} disabled={disabled}>
          Feed Pokemon
        </Button>

      </SimpleGrid>
    </Paper>
  );
};

export const BerryCard = ({
  name,
  selected,
  onClick,
}: {
  name: string;
  selected?: boolean;
  onClick?: (berryState: BerryState) => void;
}) => {
  const { data: berry } = useBerryGetByName(name);
  const { data } = useItemGetByName(berry?.item?.name);

  return (
    <ActionIcon
      variant={selected ? "filled" : "light"}
      onClick={() => onClick?.(data as BerryState)}
      size="xl"
    >
      <Image
        loading="lazy"
        w={48}
        h={48}
        draggable={false}
        fallbackSrc="/pokeball.png"
        src={data?.sprites?.default ? data?.sprites?.default?.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/', '/berries/') : "pokenull.webp"}
      />
    </ActionIcon>
  );
};
