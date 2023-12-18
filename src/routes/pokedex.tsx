import { ActionIcon, Button, Center, Group, Image, SimpleGrid, Stack, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CardAddPokemon from "../components/CardPokemonAdd";
import { usePokemonInfiniteGetAll } from "../repositories/pokemon";
import { pokemonData } from "../utils/constants";
export function Component() {
    const { ref, entry } = useIntersection();
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = usePokemonInfiniteGetAll({ limit: 10 });

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry]);
    if (status === 'error') {
        return <Title>Error: {error?.message}</Title>;
    }

    return (
        <Stack >
            <Title order={1}>Pokedex</Title>
            <Group justify="space-between" mb={45}>
                <Group>
                    {
                        pokemonData?.map(({ type, color, img }: any, index: number) => (
                            <Tooltip key={index} label={type} position="bottom" withArrow>
                                <ActionIcon color={color} c="white" radius="xl" variant="subtle">
                                    <Image src={img} alt={type} />
                                </ActionIcon>
                            </Tooltip>
                        ))
                    }
                </Group>
                <TextInput leftSection={<MagnifyingGlass />} />
            </Group>

            <SimpleGrid mt={32} verticalSpacing={56} spacing={12} cols={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}>
                {data?.pages?.map((page: any, index: number) => (
                    <Fragment key={index + "- page"}>
                        {page?.results?.map(({ name }: any, i: number) => (
                            <NavLink key={`${name}-${i}`} to={`/pokedex/${name}`} unstable_viewTransition style={{ textDecoration: "none" }}>
                                <CardAddPokemon pokemonName={name} />
                            </NavLink>
                        ))}
                    </ Fragment>
                ))}

            </SimpleGrid>
            <Center>
                <Button
                    ref={ref}
                    onClick={() => fetchNextPage()}
                    loading={isFetchingNextPage}
                    disabled={!hasNextPage}
                >
                    {isFetchingNextPage
                        ? 'Menampilkan lebih banyak...'
                        : hasNextPage
                            ? 'Tampilkan lebih banyak'
                            : 'Semua Pokemon ditampilkan'}
                </Button>
            </Center>
            <Center>
                <Text>
                    {isFetching && !isFetchingNextPage
                        ? 'Menunggu...'
                        : null}
                </Text>
            </Center>
        </Stack>
    );
}

Component.displayName = 'PokedexPage';