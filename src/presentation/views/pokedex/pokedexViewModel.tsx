import { usePokemonInfiniteGetAllInternal } from "@/domain/use-cases/pokemon";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useState } from "react";
const usePokedexViewModel = () => {
  const { ref, entry } = useIntersection();


  const [selectedType, setType] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonInfiniteGetAllInternal({ pageSize: 10, q: search, filter: { type: selectedType } });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);


  return {
    status,
    data: data,
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



export default usePokedexViewModel;
