// PokedexPage.js
import { pokemonData } from '@/utils/constants';
import { ActionIcon, Box, Button, Center, Flex, Group, Image, ScrollArea, SimpleGrid, Stack, Text, TextInput, Title, Tooltip, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import CardAddPokemon from './components/card-pokemon-add';
import usePokedexViewModel from './pokedexViewModel'; // Import the custom hook
import { TypeBadge } from './TypeBadge';

const PokedexPage = () => {

    const { colorScheme } = useMantineColorScheme();
    const binding = usePokedexViewModel(); // Use the custom hook

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
                                {pokemonData?.map(({ type, color, img }: { type: string, color: string, img: string; }, index: number) => {
                                    const isSelected = type === binding.selectedType;
                                    return (
                                        <Tooltip key={index} label={type} position="bottom" withArrow>
                                            <ActionIcon onClick={() => {
                                                if (isSelected) {
                                                    return binding.setType('');
                                                }
                                                return binding.setType(type);
                                            }} color={color} c="white" radius="xl" variant={isSelected ? "filled" : "subtle"}>
                                                <Image width={32} src={img} alt={type} />
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
                            <Image src="/search.svg" alt="search" width={20} height={20} />

                        } />
                    </Stack>
                </Flex>
                <SimpleGrid p="md"
                    w={{ base: "100%", md: "calc(100% - 300px)" }}
                    mt={32} verticalSpacing={56} spacing={12}
                    cols={{ xs: 2, sm: 3, md: 2, lg: 3, xl: 3 }}>
                    {binding?.data?.pages?.map((page: { results; }, index: number) => (
                        <React.Fragment key={index + '- page'}>
                            {page?.results?.map(({ name, ...rest }: {
                                name: string;[key: string]: any;
                            }, index: number) => (
                                <CardAddPokemon key={name + '-card-' + index}
                                    pokemonName={name}
                                    pokemonType={rest.types} />
                            ))}
                        </React.Fragment>
                    ))}

                </SimpleGrid>
                <Center mt={20}>
                    <Button

                        variant="transparent"
                        ref={binding?.intersectionRef} // Use the intersectionRef from the custom hook
                        onClick={() => binding?.fetchNextPage()}
                        loading={binding?.isFetchingNextPage}
                        disabled={!binding?.hasNextPage}
                    >
                        {binding?.isFetchingNextPage
                            ? 'Menampilkan lebih banyak...'
                            : binding?.hasNextPage
                                ? 'Tampilkan lebih banyak'
                                : (binding?.data?.pages?.[0] && binding?.data?.pages?.[0]?.meta?.totalPage > 0)
                                    ? 'Semua Pokemon ditampilkan'
                                    : 'Tidak ada pokemon'
                        }


                    </Button>
                </Center>
                <Center>
                    <Text>{binding?.isFetching && !binding?.isFetchingNextPage ? 'Menunggu...' : null}</Text>
                </Center>
            </ScrollArea>
        </Box>
    );
};

PokedexPage.displayName = 'PokedexPage';

export const Component = PokedexPage;
