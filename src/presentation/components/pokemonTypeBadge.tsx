import { HoverCard, Image, Text } from "@mantine/core";

export function PokemonTypeBadge({ type }: Readonly<{ type: { name: string; }; }>) {
  return <HoverCard withArrow>
    <HoverCard.Target>
      <Image
        loading="lazy"
        draggable={false}
        w={40}
        h={40}
        src={`/types/${type.name}.svg`}
        alt="" />
    </HoverCard.Target>
    <HoverCard.Dropdown>
      <Text>{type.name}</Text>
    </HoverCard.Dropdown>
  </HoverCard>;
}
