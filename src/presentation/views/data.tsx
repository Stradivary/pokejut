import { Image } from "@mantine/core";
import { NavItemData } from "../components/navbar/types";


export const data: NavItemData[] = [
  { icon: <Image src="/pokedex.png" w={40} h={40} />, label: "Pokedex", to: "/pokedex" },
  { icon: <Image src="/pokeball.png" w={40} h={40} />, label: "My Pokemon", to: "/pokemon" },
  { icon: <Image src="/settings.png" w={40} h={40} />, label: "Settings", to: "/settings" },
];
