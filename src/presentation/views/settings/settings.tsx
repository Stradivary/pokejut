import { Button, Divider, Group, Stack, Text, Title, useMantineColorScheme } from "@mantine/core";

export function Component() {
    const { setColorScheme, clearColorScheme } = useMantineColorScheme();

    return (
        <Stack p={16}>
            <Title order={3}>Pengaturan</Title>
            <Divider />
            <Stack>
                <Text >Pilih tema</Text>
                <Group>

                    <Button onClick={() => setColorScheme('light')}>Light</Button>
                    <Button onClick={() => setColorScheme('dark')}>Dark</Button>
                    <Button onClick={() => setColorScheme('auto')}>Auto</Button>
                    <Button onClick={clearColorScheme}>Clear</Button>
                </Group>
            </Stack>
        </Stack>
    );
}

Component.displayName = 'AboutPage';