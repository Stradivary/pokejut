import { ActionIcon, AppShell, Burger, Group, Image, Modal, Stack, Title, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useNetwork } from "@mantine/hooks";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MainNavbar } from "../components/mainNavbar";
import { data } from "./data";

export function Component() {
  const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();
  const { colorScheme } = useMantineColorScheme();

  const { online } = useNetwork();


  return (
    <AppShell
      header={{ height: { base: 1, md: 1, lg: 1, xl: 1 } }}
      footer={{ height: { base: 86, md: 1, lg: 1, xl: 1 } }}
      navbar={{
        width: { base: 0, md: 240, lg: 240, xl: 240 },
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding={0}
      layout="alt"
    >
      <AppShell.Header  >
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
        <Outlet />
        <Modal opened={online === false} onClose={() => { }} centered withCloseButton={false} >
          <Stack justify="center" align="center">
            <Image src="/pokenull.webp" alt="Pokenull Logo" w={200} h={200} />
            <Title order={4} style={{ color: "red" }}>
              Kamu sedang offline
            </Title>

          </Stack>
        </Modal>
        <ScrollRestoration />
      </AppShell.Main>
      <AppShell.Footer  >
        <Group justify="center" h="100%" px="md" hiddenFrom="md">
          {
            data.map((item) => (
              <ActionIcon component={Link} to={item.to} radius="lg" p={0} key={item.label} variant={pathname == item.to ? "filled" : "subtle"} color={colorScheme === "dark" ? "blue.7" : "blue.3"} size={73}>
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
