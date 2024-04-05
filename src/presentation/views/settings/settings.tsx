import { Button, Divider, Group, SegmentedControl, Stack, Text, Title } from "@mantine/core";
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

            <Title order={4} fw="bold">Cache</Title>

            <Text key={`cacheSize`}>Ukuran : {bindings.cacheSizeInMB} MB</Text>

            <Button w={200} color="red" onClick={bindings.handleClearCache}>Hapus Cache</Button>

            <Divider />

            <Title order={4} fw="bold">Koleksi Pokemon</Title>

            <Button w={200} color="red" onClick={bindings.handleReleaseCollection}>Hapus Koleksi Pokemon</Button>

        </Stack>
    );
}

Component.displayName = 'AboutPage';