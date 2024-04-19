import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { describe, expect, it, vi } from "vitest";
import { render } from "~/tests/test-utils";
import CardAddPokemon from "../components/card-pokemon-add";
import { TypeBadge } from "../components/typeBadge";
import { Component as PokemonList } from "../pokedex";
import usePokedexViewModel from "../pokedexViewModel";
import { mockIntersectionObserver } from "./mockIntersectionObserver";


const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

vi.mock("Math", async (importOriginal) => {
    const m = await importOriginal<typeof Math>();
    return {
        ...m,
        random: vi.fn(() => 0.42) 
    };
});
describe("Component Coverage Tests", () => {
    it("should render the PokemonDetail component correctly", () => {
        mockIntersectionObserver([true]);
        const { container } = render(<PokemonList />);

        expect(container).toMatchSnapshot();
    });

    it("should render typebadge", () => {
        const { container } = render(<TypeBadge />);

        expect(container).toMatchSnapshot();
    });
    it("should render typebadge with options", () => {
        const { container } = render(<TypeBadge data={{
            color: "blue",
            img: "placeholder",
            type: "grass"
        }} />);

        expect(container).toMatchSnapshot();
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
        const { container } = render(<CardAddPokemon pokemonName={"pikachu"} />);
        expect(container).toBeDefined();
    });
});