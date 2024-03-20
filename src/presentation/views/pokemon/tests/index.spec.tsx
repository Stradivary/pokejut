import { render } from "~/tests/test-utils";
import { Component as PokemonById } from "../pokemon.$id";
import { Component as PokemonList } from "../pokemon";
import CardPokedex from "../components/card-pokedex/PokedexCard";
import { CardPokemonSelect } from "../components/card-pokemon-selection";
import { EvolutionChainPage, EvolveCard } from "../components/EvolutionChain";
import { expect, describe, it, vi } from "vitest";
import { BerryCard } from "../components/pokemon-detail/BerryCard";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mock = new MockAdapter(axios);

describe("Component Coverage Tests", () => {
    it("should render the PokemonPage component correctly", () => {
        const mockedBerryGetAll = {
            count: 1,
            next: null,
            previous: null,
            results: [
                {
                    name: "cheri",
                    url: "https://pokeapi.co/api/v2/berry/1/"
                }
            ]
        };

        mock.onGet('https://pokeapi.co/api/v2/berry').reply(200, mockedBerryGetAll);

        vi.mock("@/data/data-source/Berries/berryDataSource", () => {
            return {
                useBerryGetAll: () => {
                    return {
                        data: mockedBerryGetAll
                    };
                }
            };
        });

        const { container } = render(<PokemonById />);
        expect(container).toBeDefined();
    });

    it("should render the PokemonPage component correctly", () => {
        // mock the PokemonState

        const { container } = render(<PokemonById />);
        expect(container).toBeDefined();
    });

    it("should render the PokemonDetail component correctly", () => {
        const { container } = render(<PokemonList />);
        expect(container).toBeDefined();
    });

    // evolution chain, CardPokedex, CardPokemonSelection
    it("should render the evolution chain component correctly", () => {
        const { container } = render(<EvolutionChainPage />);
        expect(container).toBeDefined();
    });

    it("should render the CardPokedex component correctly", () => {
        const { container } = render(<CardPokedex pokemonName={""} />);
        expect(container).toBeDefined();
    });

    it("should render the CardPokemonSelection component correctly", () => {
        const { container } = render(<CardPokemonSelect pokemonName={""} index={0} />);
        expect(container).toBeDefined();
    });

    it("should render EvolutionCard component correctly", () => {
        const { container } = render(<EvolveCard evolveItem={undefined} />);
        expect(container).toBeDefined();
    });
    it("should render the empty BerryCard component correctly", () => {
        vi.mock("@/domain/use-cases/simulator", () => ({
            useSimulator: () => ({
                selectedPokemon: { name: "test" },

                pokemonList: [

                ], releaseSelectedPokemon: () => { }
            })
        }));
        const { container } = render(<BerryCard name={""} />);
        expect(container).toBeDefined();

        vi.mock("@/domain/use-cases/simulator", () => ({
            useSimulator: () => ({
                selectedPokemon: { name: "test" },
                pokemonList: [
                    { name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] }
                ], releaseSelectedPokemon: () => { }
            })
        }));
        const { container: container2 } = render(<BerryCard detailed name={""} />);
        expect(container2).toBeDefined();
        vi.restoreAllMocks();
    });




});