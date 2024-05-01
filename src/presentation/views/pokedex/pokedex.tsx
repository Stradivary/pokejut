import { Tooltip } from '@/presentation/components/tooltip';
import { pokemonData } from '@/utils/constants';
import { ActionIcon, Box, Button, Center, Flex, Group, Image, Loader, ScrollArea, SimpleGrid, Stack, Text, TextInput, Title, useMantineColorScheme } from '@mantine/core';
import { PaginatedList } from './components/paginatedList';
import { SearchIcon } from "./components/searchIcon";
import { TypeBadge } from './components/typeBadge';
import usePokedexViewModel from './pokedexViewModel';


const PokedexPage = () => {

    const { colorScheme } = useMantineColorScheme();
    const binding = usePokedexViewModel();

    if (binding?.status === 'error') {
        return <Title>Error: {binding?.error?.message}</Title>;
    }

    return (
        <Box pos="relative" h={"calc(100vh - 32px)"}>
            <ScrollArea style={{
                height: "calc(100vh - 32px)",
                width: "100%",
            }}
                scrollbars="y"
            >

                <Flex p="md" w={{
                    base: "100%",
                    md: "calc(100% - var(--app-shell-navbar-width))"
                }} style={{
                    flexDirection: "column", position: "sticky", top: 0, left: 0, right: 0, zIndex: 10,
                    background: colorScheme === "dark" ? "#0a0a0ada" : "#ffffffda",
                    backdropFilter: "blur(8px)"
                }} >
                    <Title order={1}>Pokedex</Title>
                    <Stack w="100%">
                        <ScrollArea h={42} w="calc(100vw - 20px)"  >
                            <Group wrap='nowrap'>
                                {pokemonData?.map(({ type, color, img }: any) => {
                                    const isSelected = type === binding.selectedType;
                                    const handleFilterClick = () => {
                                        if (isSelected) {
                                            return binding.setSelectedType('');
                                        }
                                        return binding.setSelectedType(type);
                                    };

                                    return (
                                        <Tooltip key={`action-${type}`} label={type} position="bottom" withArrow>
                                            <ActionIcon onClick={handleFilterClick} color={color} c="white" radius="xl" size="lg" variant={ "filled" }>
                                                <Image w={20} h={20} src={img} alt={type} />
                                            </ActionIcon>
                                        </Tooltip>
                                    );
                                })}
                            </Group>
                        </ScrollArea>
                        {
                            binding.selectedType && pokemonData?.find(({ type }: { type: string; }) => type === binding.selectedType) && (
                                <TypeBadge data={pokemonData?.find(({ type }: { type: string; }) => type === binding.selectedType)} />

                            )
                        }
                        <TextInput w="calc(100% - 32px)" value={binding.search} onChange={(x) => binding.setSearch(x.target.value)} leftSection={
                            <SearchIcon alt="search" width={24} height={24} />
                        } />
                    </Stack>
                </Flex>
                <SimpleGrid p="md"
                    w={{ base: "calc(100% - 32px)", md: "calc(100% - 300px)" }}
                    mt={32} verticalSpacing={56} spacing={12}
                    cols={{ xs: 2, sm: 3, md: 2, lg: 3, xl: 3 }}>
                    <PaginatedList pages={binding?.data?.pages ?? []} />
                </SimpleGrid>
                {binding?.isFetching &&
                    <Stack justify='center' w="100%">
                        <Loader mx="auto" />
                        <Text w="100%" mx="auto" ta="center">{!binding?.isFetchingNextPage ? 'Mohon Tunggu...' : null}</Text>
                    </Stack>
                }
                <Center mt={20}>
                    <Button
                        opacity={binding?.isFetching ? 0 : 1}
                        variant="transparent"
                        ref={binding?.intersectionRef} // Use the intersectionRef from the custom hook
                        onClick={() => binding?.fetchNextPage()}
                        loading={binding?.isFetchingNextPage}
                        disabled={!binding?.hasNextPage}
                    >
                        {
                            binding?.isFetchingNextPage
                                ? 'Menampilkan lebih banyak...'
                                : " "
                        }
                        {
                            !binding?.isFetchingNextPage && binding?.hasNextPage
                                ? 'Tampilkan lebih banyak'
                                : " "
                        }
                        {
                            (!binding?.hasNextPage && binding?.data?.pages?.[0] && binding?.data?.pages?.[0]?.meta?.totalPage > 0)
                                ? 'Semua Pokemon ditampilkan' :
                                "Tidak ada Pokemon yang ditemukan"
                        }

                    </Button>
                </Center>
            </ScrollArea>
        </Box>
    );
};


PokedexPage.displayName = 'PokedexPage';

export const Component = PokedexPage;
