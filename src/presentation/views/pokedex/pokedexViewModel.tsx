import { useEffect, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { usePokemonInfiniteGetAll } from "@/data/dataSource/Pokemon/pokemonDataSource";
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

  const [selectedType, setType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const filteredData = getFiltteredData(data, search);
  return {
    status,
    data: filteredData,
    error,
    isFetching,
    isFetchingNextPage,
    search,
    setSearch,
    fetchNextPage,
    hasNextPage,
    intersectionRef: ref,
    selectedType,
    setType,
  };
};

const getFiltteredData = (data: any, search: string) => {
  if (!data) return { pages: [] };
  // foreach page in data.pages, filter the results based on the search query
  const filteredData = data?.pages?.map((page: any) => {
    return {
      results: page?.results?.filter((result: any) =>
        result?.name?.toLowerCase().includes(search.toLowerCase())
      ),
    };
  });
  // return the filtered data
  return { pages: filteredData ?? [] };
};

export default usePokedexViewModel;
