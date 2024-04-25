import { Button, Divider, Group, SegmentedControl, Stack, Title } from "@mantine/core";
import { useSettingsViewModel } from "./useSettingsViewModel";

export function Component() {
    const bindings = useSettingsViewModel();
    return (
        <Stack p={16}>
            <Title  >Pengaturan</Title>
            <Group w="80%" mt={16} justify="space-between">
                <Title order={4} fw="bold">Tema</Title>
                <SegmentedControl
                    value={bindings.colorScheme}
                    onChange={(value) => bindings.setColorScheme(value as 'light' | 'dark')}
                    data={bindings.colorSchemeOptions} fullWidth />
            </Group>
            <Divider />

            <Title order={4} fw="bold">Koleksi Pokemon</Title>

            <Button maw={240} disabled={bindings.canReleaseCollection} color="red" onClick={bindings.handleReleaseCollection}>Hapus Koleksi Pokemon</Button>

        </Stack>
    );
}

Component.displayName = 'AboutPage';