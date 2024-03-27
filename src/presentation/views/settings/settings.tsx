import { useSimulator } from "@/domain/use-cases/simulator";
import { Button, Divider, Group, SegmentedControl, Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export function Component() {
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const {
        clearPokemonList,
        clearSelectedPokemon
    } = useSimulator();

    const cacheSize = localStorage.getItem('REACT_QUERY_OFFLINE_CACHE')?.length;
    return (
        <Stack p={16}>
            <Title  >Pengaturan</Title> 
            <Group w="80%" mt={16} justify="space-between">
                <Title order={4} fw="bold">Tema</Title>
                <SegmentedControl value={colorScheme} onChange={
                    (value) => setColorScheme(value as 'light' | 'dark')
                } data={[{
                    value: 'light',
                    label: 'Terang',
                }, {
                    value: 'dark',
                    label: 'Gelap',
                }]} fullWidth />
            </Group>
            <Divider />

            <Title order={4} fw="bold">Cache</Title>

            <Text key={`cacheSize`}>Ukuran : {cacheSize ? (cacheSize / 1024 / 1024).toFixed(2) : 0} MB</Text>

            <Button w={200} color="red" onClick={() => {
                localStorage.clear();
                notifications.show({
                    title: "Berhasil",
                    message: "Cache berhasil dihapus",
                    color: "blue",
                    icon: <img src="/pokeball.png" alt="pokeball" />,
                });
                window.location.reload();
            }}>Hapus Cache</Button>

            <Divider />

            <Title order={4} fw="bold">Koleksi Pokemon</Title>

            <Button w={200} color="red" onClick={() => {
                clearSelectedPokemon();
                clearPokemonList();
                notifications.show({
                    title: "Berhasil",
                    message: "Koleksi Pokemon berhasil dihapus",
                    color: "blue",
                    icon: <img src="/pokeball.png" alt="pokeball" />,
                });
            }}>Hapus Koleksi Pokemon</Button>

        </Stack>
    );
}

Component.displayName = 'AboutPage';