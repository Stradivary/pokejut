import { Image } from "@mantine/core";
import { Tooltip } from "./tooltip";

export function PokemonTypeBadge({ type }: Readonly<{ type: { name: string; }; }>) {
  return (
    <Tooltip label={type.name}>
      <Image loading="lazy" draggable={false} w={40} h={40}
        src={`/types/${type.name}.svg`} alt={`${type.name}`} />
    </Tooltip>
  );
}
