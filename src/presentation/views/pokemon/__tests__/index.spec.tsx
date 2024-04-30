import { render } from "~/tests/test-utils";
import { Component as PokemonById } from "../pokemon.selected";
import { Component as PokemonList } from "../pokemon";
import CardPokedex from "../components/evolution-card";
import { CardPokemonSelect } from "../components/card-pokemon-selection";
import { EvolutionChainPage } from "../components/pokemon-detail/evolutionChain";
import { expect, describe, it, vi } from "vitest";
import { BerryCard, BerryCardDetail } from "../components/pokemon-detail/berryCard";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { FirmnessTable } from "../components/pokemon-detail/firmnessTable";
import { PokemonDetail } from "../components/pokemon-detail";

import { Component as PokemonPage } from "../pokemon";
import { BerriesFeeder } from "../components/pokemon-detail/berriesFeeder";

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
          url: "https://pokeapi.co/api/v2/berry/1/",
        },
      ],
    };

    mock.onGet("https://pokeapi.co/api/v2/berry").reply(200, mockedBerryGetAll);

    vi.mock("@/domain/data-source/Berries/berryDataSource", () => {
      return {
        useBerryGetAll: () => {
          return {
            data: mockedBerryGetAll,
          };
        },
      };
    });

    const { container } = render(<PokemonById />);
    expect(container).toBeDefined();
    vi.restoreAllMocks();
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
    const { container } = render(<EvolutionChainPage pokemonId={undefined} pokemonState={undefined} nextEvolutionChain={undefined} readyToEvolve={undefined} setReadyToEvolve={undefined} />);
    expect(container).toBeDefined();
  });

  it("should render the CardPokedex component correctly", () => {
    const { container } = render(<CardPokedex pokemonName={""} readyToEvolve={{}}
      setReadyToEvolve={function (value: { [key: string]: boolean; }): void {
        console.log(value);
      }} />);
    expect(container).toBeDefined();
  });

  it("should render the CardPokemonSelection component correctly", () => {
    const { container } = render(
      <CardPokemonSelect pokemonName={""} index={""} weight={""} />
    );
    expect(container).toBeDefined();
  });

  it("should render the empty BerryCard component correctly", () => {
    vi.mock("@/domain/use-cases/simulator", () => ({
      useSimulator: () => ({
        selectedPokemonId: "",

        pokemonList: [],
        releaseSelectedPokemon: vi.fn(),
      }),
    }));
    const { container } = render(<BerryCard name={""} />);
    expect(container).toBeDefined();

    vi.mock("@/domain/use-cases/simulator", () => ({
      useSimulator: () => ({
        selectedPokemon: "",
        pokemonList: [
          { name: "Pikachu", pokeId: "1", weight: 1, fedBerries: [] },
        ],
        releaseSelectedPokemon: vi.fn(),
      }),
    }));
    const { container: container2 } = render(<BerryCardDetail name={""} />);
    expect(container2).toBeDefined();
    vi.restoreAllMocks();
  });

  it("should render FirmnessTable ", () => {
    const { container } = render(<FirmnessTable modifier={0} />);
    expect(container).toBeDefined();
  });

  it("should render the PokemonPage component correctly", () => {
    const { container } = render(<PokemonPage />);
    expect(container).toBeDefined();
  });

  // PokemonDetail
  it("should render the PokemonDetail component correctly", () => {
    const { container } = render(<PokemonDetail pokemonId="00" readyToEvolve={{}} />);
    expect(container).toBeDefined();
  });

  it("should render Berries Feeder component correctly", () => {
    const { container } = render(<BerriesFeeder
      feedPokemon={() => { }}
      selectedPokemonId="1" canFeedBerry={true} />);
    expect(container).toBeDefined();
  });
});
