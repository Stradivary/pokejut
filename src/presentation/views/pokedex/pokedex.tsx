// PokedexPage.js
import CardAddPokemon from '@/presentation/components/CardPokemonAdd';
import { pokemonData } from '@/utils/constants';
import { ActionIcon, Button, Center, Group, Image, ScrollArea, SimpleGrid, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';
import usePokedexViewModel from './pokedexViewModel'; // Import the custom hook

const PokedexPage = () => {

    const binding = usePokedexViewModel(); // Use the custom hook

    if (binding?.status === 'error') {
        return <Title>Error: {binding?.error?.message}</Title>;
    }

    return (
        <Stack p={10}>
            <Title order={1}>Pokedex</Title>
            <Group justify="space-between" mb={45}>
                <ScrollArea h={48} w="calc(100vw - 20px)"  >
                    <Group wrap='nowrap'>
                        {pokemonData?.filter(
                            ({ type }: { type: string; }) => !['dark', 'dragon'].includes(type)
                        ).map(({ type, color, img }: { type: string, color: string, img: string; }, index: number) => {
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

            <SimpleGrid w={{ base: "calc(100vw - 20px)", md: "calc(75vw - calc(var(--app-shell-footer-offset, 0px) - var(--app-shell-padding)))" }} mt={32} verticalSpacing={56} spacing={12} cols={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3 }}>
                {binding?.data?.pages?.map((page: { results: { name: string; }[]; }, index: number) => (
                    <React.Fragment key={index + '- page'}>
                        {page?.results?.map(({ name }: { name: string; }) => (
                            <CardAddPokemon key={
                                name + '-card-' + index
                            } pokemonName={name} visibleType={binding.selectedType} />
                        ))}
                    </React.Fragment>
                ))}
            </SimpleGrid>
            <Center>
                <Button
                    ref={binding?.intersectionRef} // Use the intersectionRef from the custom hook
                    onClick={() => binding?.fetchNextPage()}
                    loading={binding?.isFetchingNextPage}
                    disabled={!binding?.hasNextPage}
                >
                    {binding?.isFetchingNextPage ? 'Menampilkan lebih banyak...' : binding?.hasNextPage ? 'Tampilkan lebih banyak' : 'Semua Pokemon ditampilkan'}
                </Button>
            </Center>
            <Center>
                <Text>{binding?.isFetching && !binding?.isFetchingNextPage ? 'Menunggu...' : null}</Text>
            </Center>
        </Stack>
    );
};

PokedexPage.displayName = 'PokedexPage';

export const Component = PokedexPage; 
