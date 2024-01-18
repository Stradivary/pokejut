import { ActionIcon, AppShell, Burger, Group, ScrollArea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MainNavbar } from "../components/Navbar/MainNavbar";
import { ArchiveBox, CircleHalf, Gear } from "@phosphor-icons/react";
import { NavItemData } from "../components/Navbar/types";

export const data: NavItemData[] = [
  { icon: <ArchiveBox />, label: "Pokedex", to: "/pokedex" },
  { icon: <CircleHalf />, label: "My Pokemon", to: "/pokemon" },
  { icon: <Gear />, label: "Settings", to: "/settings" },
];

export function Component() {
  const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();
  return (
    <AppShell
      header={{ height: { base: 0, md: 60, lg: 60, xl: 60} }}
      footer={{ height: { base: 60, md: 60, lg: 60, xl: 60 } }}
      navbar={{
        width: { base: 0, md: 240, lg: 240, xl: 240 },
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      layout="alt"
    >
      <AppShell.Header   >
        <Group h="100%" px="md" visibleFrom="md" >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3} m="md" hiddenFrom="sm">
            Pokedex
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <MainNavbar opened={opened} toggle={toggle} data={data} />
      </AppShell.Navbar>
      <AppShell.Main >
        <ScrollArea h={"100%"} >
          <Outlet />
        </ScrollArea>
      </AppShell.Main>
      <AppShell.Footer >
        <Group justify="center" h="100%" px="md" hiddenFrom="md">
          {
            data.map((item) => (
              <ActionIcon component={Link} to={item.to} radius="lg" p={0} key={item.label} variant={pathname == item.to ? "filled" : "subtle"} size="xl">
                {item.icon}
              </ActionIcon>
            ))
          }
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
Component.DisplayName = "MainPage";
