import { ArchiveBox, CircleHalf, Gear } from "@phosphor-icons/react";
import { NavItemData } from "../components/Navbar/types";



export const data: NavItemData[] = [
    { icon: <ArchiveBox />, label: 'Pokedex', to: '/pokedex' },
    { icon: <CircleHalf />, label: 'My Pokemon', to: '/pokemon' },
    { icon: <Gear />, label: 'Settings', to: '/settings' }
];
