import { AppShell, Burger, Group, Image, NavLink, ScrollArea, Title } from "@mantine/core";
import { useMemo } from "react";
import { NavLink as NL, useLocation } from "react-router-dom";
import { NavItemData } from "./types";

export const MainNavbar = ({
    data,
    opened, toggle
}: {
    data: NavItemData[];
    opened: boolean;
    toggle: () => void;
}) => {
    const location = useLocation();
    const items = useMemo(() => data.map((item) => (
        <NavLink
            key={item.label}
            active={location.pathname === item?.to}
            label={item.label}
            description={item?.description}
            rightSection={item.rightSection}
            leftSection={item.icon}
            component={NL}
            to={item.to}
            unstable_viewTransition
            variant="subtle" />
    )), [location.pathname, data]);
    return <>
        <AppShell.Section>
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Image src="/logo.png" alt="logo" w={40} h={40} />
                <Title order={4} m="md">
                    Pokegochi
                </Title>
            </Group>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
            {items}
        </AppShell.Section>
        <AppShell.Section>
            {/* about */}
            <NavLink
                label="About"

                active={location.pathname === "/about"}
                variant="subtle"
                component={NL}
                to="/about" />
            <NavLink
                label="Logout"
                variant="subtle"
                component={NL}
                to="/logout" />
        </AppShell.Section>
    </>;
};
