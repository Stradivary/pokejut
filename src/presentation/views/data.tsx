import { Image } from "@mantine/core";
import { NavItemData } from "../components/navbar/types";


export const data: NavItemData[] = [
  { icon: <Image src="/pokedex.png"/>, label: "Pokedex", to: "/pokedex" },
  { icon: <Image src="/pokeball.png" />, label: "My Pokemon", to: "/pokemon" },
  { icon: <Image src="/settings.png"/>, label: "Settings", to: "/settings" },
];
