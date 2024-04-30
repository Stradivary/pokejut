import { useBerryGetByName } from "@/domain/use-cases/berries";
import { useItemGetByName } from "@/domain/use-cases/items";
import { BerryState } from "@/domain/use-cases/simulator";
import { berriesGain, firmnesColor } from "@/utils/constants";
import {
  Badge,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title
} from "@mantine/core";



export const BerryCardDetail = ({
  name, onClick, disabled,
}: {
  name: string;
  onClick?: (berryState: BerryState) => void;
  disabled?: boolean;
}) => {
  const { data: berry } = useBerryGetByName(name);
  const { data } = useItemGetByName(berry?.item?.name);

  const berryFirmnessName = berry?.firmness?.name ?? "";

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
              src={data?.sprites?.default} />
            <Stack my={10}>
              <Text tt="capitalize">{berry?.name}</Text>
              <Badge tt="capitalize" color={firmnesColor[berryFirmnessName]}>
                {berryFirmnessName?.replace("-", " ")}
              </Badge>
              <Text>
                Berat : {berriesGain[berryFirmnessName]} kg
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
