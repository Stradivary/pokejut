// PokedexPage.js
import { pokemonData } from '@/utils/constants';
import { ActionIcon, Box, Button, Center, Flex, Group, Image, ScrollArea, SimpleGrid, Text, TextInput, Title, Tooltip, useMantineColorScheme } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';
import CardAddPokemon from './components/CardPokemonAdd';
import usePokedexViewModel from './pokedexViewModel'; // Import the custom hook

const PokedexPage = () => {

    const { colorScheme } = useMantineColorScheme();
    const binding = usePokedexViewModel(); // Use the custom hook

    if (binding?.status === 'error') {
        return <Title>Error: {binding?.error?.message}</Title>;
    }

    return (
        <Box pos="relative" h={"calc(100vh - 32px)"}>
            <ScrollArea h="100%"
                scrollbars="y"
                w={"100%"} >

                <Flex p="md" style={{
                    flexDirection: "column", position: "sticky", top: 0, left: 0, right: 0, zIndex: 10,
                    background: colorScheme === "dark" ? "#0a0a0ada" : "#ffffffda",
                    backdropFilter: "blur(8px)"
                }} >
                    <Group>

                        <Title order={1}>Pokedex</Title> {
                            binding.selectedType && (
                                <Text
                                    tt="capitalize"
                                >
                                    {binding.selectedType}
                                </Text>
                            )
                        }
                    </Group>
                    <Group justify="space-between"  >

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
                                            }} color={color} c="white" size={isSelected ? "lg" : "md"} radius="xl" variant={isSelected ? "filled" : "subtle"}>
                                                <Image width={32} src={img} alt={type} />
                                            </ActionIcon>
                                        </Tooltip>
                                    );
                                })}
                            </Group>
                        </ScrollArea>

                        <TextInput value={binding.search} onChange={(x) => binding.setSearch(x.target.value)} leftSection={<MagnifyingGlass />} />
                    </Group>
                </Flex>
                <SimpleGrid p="md"
                    w={{ base: "100%", md: "calc(100% - 300px)" }}
                    mt={32} verticalSpacing={56} spacing={12}
                    cols={{ xs: 2, sm: 3, md: 2, lg: 3, xl: 3 }}>
                    {binding?.data?.pages?.map((page: { results; }, index: number) => (
                        <React.Fragment key={index + '- page'}>
                            {page?.results?.map(({ name }: { name: string; }) => (
                                <CardAddPokemon key={
                                    name + '-card-' + index
                                } pokemonName={name} visibleType={binding.selectedType} />
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
