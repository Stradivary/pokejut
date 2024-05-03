import { Button, Divider, Group, SegmentedControl, Stack, Title } from "@mantine/core";
import { useSettingsViewModel } from "./useSettingsViewModel";

export function Component() {
    const bindings = useSettingsViewModel();

    return <Stack p={16}>
        <Title order={1} fz={18} >Pengaturan</Title>
        <Group w="80%" mt={16} justify="space-between">
            <Title order={2} fz={16} fw="bold">Tema</Title>
            <SegmentedControl
                value={bindings.colorScheme}
                onChange={bindings.handleChangeColorScheme}
                data={bindings.colorSchemeOptions} fullWidth />
        </Group>
        <Divider />

        <Title order={2} fz={16} fw="bold">Koleksi Pokemon</Title>

        <Button
            maw={240}
            disabled={bindings.canReleaseCollection}
            color="red"
            onClick={bindings.handleReleaseCollection}>
            Hapus Koleksi Pokemon
        </Button>

    </Stack>;
}

Component.displayName = 'SettingsPage';