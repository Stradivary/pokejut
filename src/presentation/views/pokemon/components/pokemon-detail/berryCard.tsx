
import { useBerryGetByName } from "@/domain/use-cases/berries";
import { useItemGetByName } from "@/domain/use-cases/items";
import type { BerryState } from "@/domain/use-cases/simulator/types";
import {
  ActionIcon,
  Image,
} from "@mantine/core";


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
        src={data?.sprites?.default}
      />
    </ActionIcon>
  );
};
