import { useEffect } from 'react';
import { useIntersection } from '@mantine/hooks';
import { usePokemonInfiniteGetAll } from '../repositories/pokemons';

const usePokedexViewModel = () => {
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

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    intersectionRef: ref,
  };
};

export default usePokedexViewModel;
