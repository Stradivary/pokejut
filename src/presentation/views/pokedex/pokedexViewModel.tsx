import { usePokemonInfiniteGetAllInternal } from "@/domain/use-cases/pokemon";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useState } from "react";

const usePokedexViewModel = () => {

  const [selectedType, setSelectedType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  
  const { ref, entry } = useIntersection();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonInfiniteGetAllInternal({ q: search, filter: selectedType });

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
    search,
    setSearch,
    fetchNextPage,
    hasNextPage,
    intersectionRef: ref,
    selectedType,
    setSelectedType,
  };
};



export default usePokedexViewModel;
