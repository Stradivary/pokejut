import { AppShell, Burger, Group, ScrollArea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArchiveBox, CircleHalf, Gear } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";
import { MainNavbar } from "../components/Navbar/MainNavbar";
import { NavItemData } from "../components/Navbar/types";


export const data: NavItemData[] = [
    { icon: <ArchiveBox />, label: 'Pokedex', to: '/pokedex' },
    { icon: <CircleHalf />, label: 'My Pokemon', to: '/pokemon' },
    { icon: <Gear />, label: 'Settings', to: '/settings' }
];


export function Component() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: { base: 60, sm: 8 } }}
            navbar={{
                width: { base: 200, md: 300, lg: 400 },
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
            layout="alt"
        >
            <AppShell.Header hiddenFrom="sm">
                <Group h="100%" px="md" hiddenFrom="sm">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Title order={3} m="md" hiddenFrom="sm">
                        Pokedex
                    </Title>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <MainNavbar opened={opened} toggle={toggle} data={data} />
            </AppShell.Navbar>
            <AppShell.Main miw="80%" >
                <ScrollArea h={"100%"}>
                    <Outlet />
                </ScrollArea>
            </AppShell.Main>
        </AppShell>
    );
};
Component.DisplayName = 'MainPage';