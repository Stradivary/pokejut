import { render } from "~/tests/test-utils";
import { Component as PokemonById } from "../pokemon.selected";
import { Component as PokemonList } from "../pokemon";
import CardPokedex from "../components/evolution-card";
import { CardPokemonSelect } from "../components/card-pokemon-selection";
import { EvolutionChainPage } from "../components/pokemon-detail/evolutionChain";
import { expect, describe, it, vi } from "vitest";
import { BerryCard } from "../components/pokemon-detail/berryCard";
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

        vi.mock("@/domain/data-source/Berries/berryDataSource", () => {
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
        const { container } = render(<EvolutionChainPage pokemonId={undefined} />);
        expect(container).toBeDefined();
    });

    it("should render the CardPokedex component correctly", () => {
        const { container } = render(<CardPokedex pokemonName={""} />);
        expect(container).toBeDefined();
    });

    it("should render the CardPokemonSelection component correctly", () => {
        const { container } = render(<CardPokemonSelect pokemonName={""} index={""} weight={""} />);
        expect(container).toBeDefined();
    });

    it("should render the empty BerryCard component correctly", () => {
        vi.mock("@/domain/use-cases/simulator", () => ({
            useSimulator: () => ({
                selectedPokemonId: "",

                pokemonList: [

                ],
                releaseSelectedPokemon: vi.fn()
            })
        }));
        const { container } = render(<BerryCard name={""} />);
        expect(container).toBeDefined();

        vi.mock("@/domain/use-cases/simulator", () => ({
            useSimulator: () => ({
                selectedPokemon: "",
                pokemonList: [
                    { name: 'Pikachu', pokeId: '1', weight: 1, fedBerries: [] }
                ],
                releaseSelectedPokemon: vi.fn()
            })
        }));
        const { container: container2 } = render(<BerryCard detailed name={""} />);
        expect(container2).toBeDefined();
        vi.restoreAllMocks();
    });




});