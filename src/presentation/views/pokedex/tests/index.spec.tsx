import { render } from "~/tests/test-utils";
import { Component as PokemonList } from "../pokedex";
import CardAddPokemon from "../components/card-pokemon-add";
import usePokedexViewModel from "../pokedexViewModel";
import { expect, describe, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockIntersectionObserver } from "./mockIntersectionObserver";


const mock = new MockAdapter(axios);
const queryClient = new QueryClient();
describe("Component Coverage Tests", () => {

    it("should render the PokemonDetail component correctly", () => {
        const [_] = mockIntersectionObserver([true]);
        const { container } = render(<PokemonList />);

        expect(container).toBeDefined();
    });

    it("should test the usePokedexViewModel", async () => {

        const mockResponse = { data: { id: 1, name: 'evolution1' } };
        mock.onGet('https://pokeapi.co/api/v2/pokemon').reply(200, mockResponse);

        const wrapper = ({ children }) => (<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>);
        const { result } = renderHook(() => usePokedexViewModel(), { wrapper });
        await waitFor(() => {
            expect(result.current.data).toBeDefined();
        });

    });

    it("should render the CardAddPokemon component correctly", () => {
        const mockResponse = {
            data: {
                id: 1, name: "pikachu", weight: 1, height: 1, abilities: [], species: { name: "", url: "" }, sprites: {
                    back_default: "",
                    other: {} as any
                }, stats: {
                    hp: 1,
                    attack: 1,
                    defense: 1,
                    speed: 1,
                }, types: []
            }
        };
        mock.onGet('https://pokeapi.co/api/v2/pokemon/pikachu').reply(200, mockResponse);
        mock.onGet('https://pokeapi.co/api/v2/pokemon-species/1').reply(200, { data: { evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/1" } } });
        mock.onGet('https://pokeapi.co/api/v2/evolution-chain/1').reply(200, { data: { chain: { species: { name: "pikachu" } } } });
        const { container } = render(<CardAddPokemon pokemonName={"pikachu"} visibleType={""} />);
        expect(container).toBeDefined();
    });
});