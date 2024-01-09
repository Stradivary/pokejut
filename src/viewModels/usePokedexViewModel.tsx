import { useEffect, useState } from 'react';
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

  const [selectedType, setType] = useState<string>('');

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    intersectionRef: ref,
    selectedType,
    setType,
  };
};

export default usePokedexViewModel;
