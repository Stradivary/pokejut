// PokedexPage.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ActionIcon, Button, Center, Group, Image, SimpleGrid, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import CardAddPokemon from '../components/CardPokemonAdd';
import { pokemonData } from '../utils/constants';
import usePokedexViewModel from '../viewModels/usePokedexViewModel'; // Import the custom hook

const PokedexPage = () => {
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        intersectionRef,
    } = usePokedexViewModel(); // Use the custom hook

    if (status === 'error') {
        return <Title>Error: {error?.message}</Title>;
    }

    return (
        <Stack>
            <Title order={1}>Pokedex</Title>
            <Group justify="space-between" mb={45}>
                <Group>
                    {pokemonData?.map(({ type, color, img }: any, index: number) => (
                        <Tooltip key={index} label={type} position="bottom" withArrow>
                            <ActionIcon color={color} c="white" radius="xl" variant="subtle">
                                <Image src={img} alt={type} />
                            </ActionIcon>
                        </Tooltip>
                    ))}
                </Group>
                <TextInput leftSection={<MagnifyingGlass />} />
            </Group>

            <SimpleGrid mt={32} verticalSpacing={56} spacing={12} cols={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}>
                {data?.pages?.map((page: any, index: number) => (
                    <React.Fragment key={index + '- page'}>
                        {page?.results?.map(({ name }: any, i: number) => (
                            <CardAddPokemon pokemonName={name} />
                        ))}
                    </React.Fragment>
                ))}
            </SimpleGrid>
            <Center>
                <Button
                    ref={intersectionRef} // Use the intersectionRef from the custom hook
                    onClick={() => fetchNextPage()}
                    loading={isFetchingNextPage}
                    disabled={!hasNextPage}
                >
                    {isFetchingNextPage ? 'Menampilkan lebih banyak...' : hasNextPage ? 'Tampilkan lebih banyak' : 'Semua Pokemon ditampilkan'}
                </Button>
            </Center>
            <Center>
                <Text>{isFetching && !isFetchingNextPage ? 'Menunggu...' : null}</Text>
            </Center>
        </Stack>
    );
};

PokedexPage.displayName = 'PokedexPage';

export const Component = PokedexPage; 
