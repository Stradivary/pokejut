import { ArchiveBox, CircleHalf, Gear } from "@phosphor-icons/react";
import { NavItemData } from "../components/Navbar/types";
import { Image } from "@mantine/core";


export const data: NavItemData[] = [
  { icon: <Image src="/pokedex.png"/>, label: "Pokedex", to: "/pokedex" },
  { icon: <Image src="/pokeball.png" />, label: "My Pokemon", to: "/pokemon" },
  { icon: <Image src="/settings.png"/>, label: "Settings", to: "/settings" },
];
