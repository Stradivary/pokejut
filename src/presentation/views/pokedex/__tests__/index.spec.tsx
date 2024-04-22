import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { describe, expect, it, vi } from "vitest";
import { mockIntersectionObserver } from "~/tests/mockIntersectionObserver";
import { render } from "~/tests/test-utils";
import CardAddPokemon from "../components/card-pokemon-add";
import {
  evolveSelectedPokemon,
  mapEvolutionChain,
} from "../components/card-pokemon-add/mapEvolutionChain";
import { TypeBadge } from "../components/typeBadge";
import { Component as PokemonList } from "../pokedex";

const mock = new MockAdapter(axios);

vi.mock("Math", async (importOriginal) => {
  const m = await importOriginal<typeof Math>();
  return {
    ...m,
    random: vi.fn(() => 0.42),
  };
});

describe("Component Coverage Tests", () => {
  it("should render PokedexPage component correctly", () => {
    vi.mock("../pokedexViewModel", () => {
      return {
        default: () => {
          return {
            data: {},
          };
        },
      };
    });
    const { container } = render(<PokemonList />);
    expect(container).toMatchSnapshot();
    vi.restoreAllMocks();
  });
  it("should render PokedexPage error", () => {
    vi.mock("../pokedexViewModel", () => {
      return {
        default: () => {
          return {
            status: "error",
            error: { message: "error" },
          };
        },
      };
    });
    const { container } = render(<PokemonList />);
    expect(container).toMatchSnapshot();
    vi.restoreAllMocks();
  });
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
    const { container } = render(
      <TypeBadge
        data={{
          color: "blue",
          img: "placeholder",
          type: "grass",
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render the CardAddPokemon component correctly", () => {
    const mockResponse = {
      data: {
        id: 1,
        name: "pikachu",
        weight: 1,
        height: 1,
        abilities: [],
        species: { name: "", url: "" },
        sprites: {
          other: {} as any,
        },
        stats: {
          hp: 1,
          attack: 1,
          defense: 1,
          speed: 1,
        },
        types: [],
      },
    };
    mock
      .onGet("https://pokeapi.co/api/v2/pokemon/pikachu")
      .reply(200, mockResponse);
    mock.onGet("https://pokeapi.co/api/v2/pokemon-species/1").reply(200, {
      data: {
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/1",
        },
      },
    });
    mock
      .onGet("https://pokeapi.co/api/v2/evolution-chain/1")
      .reply(200, { data: { chain: { species: { name: "pikachu" } } } });
    const { container } = render(<CardAddPokemon pokemonName={"pikachu"} />);
    expect(container).toBeDefined();
  });
});
describe("mapEvolutionChain", () => {
  it("should map evolution chain correctly", () => {
    const data = {
      species: { name: "pikachu" },
      evolves_to: [
        {
          species: { name: "raichu" },
          evolves_to: [
            {
              species: { name: "alolan-raichu" },
              evolves_to: [],
            },
          ],
        },
      ],
    };

    const expectedEvolutionChain = {
      is_baby: false,
      species: "pikachu",
      evolves_to: [
        {
          is_baby: false,
          species: "raichu",
          evolves_to: [
            {
              is_baby: false,
              species: "alolan-raichu",
              evolves_to: [],
            },
          ],
        },
      ],
    };

    const result = mapEvolutionChain(data);

    expect(result).toEqual(expectedEvolutionChain);
  });
});

describe("evolveSelectedPokemon", () => {
  it("should return false if either pokemon or evolveItem is not provided", () => {
    const result = evolveSelectedPokemon(null, null, null);
    expect(result).toBe(false);
  });

  it("should call catchPokemon with the correct parameters", () => {
    const pokemon = {
      id: 1,
      name: "pikachu",
      types: ["electric"],
      height: 0.4,
      weight: 6,
      sprites: {
        front_default: "https://pokeapi.co/media/sprites/pokemon/25.png",
        other: {
          dream_world: {
            front_default:
              "https://pokeapi.co/media/sprites/pokemon/other/dream-world/25.svg",
          },
          home: {},
        },
      },
      species: { name: "pikachu" },
    };
    const evolveItem = {
      chain: {
        species: { name: "pikachu" },
        evolves_to: [
          {
            species: { name: "raichu" },
            evolves_to: [
              {
                species: { name: "alolan-raichu" },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    };
    const catchPokemon = vi.fn();

    evolveSelectedPokemon(pokemon, evolveItem, catchPokemon);

    expect(catchPokemon).toHaveBeenCalledWith({
      id: 1,
      name: "pikachu",
      types: ["electric"],
      height: 0.4,
      weight: 6,
      sprites: {
        front_default: "https://pokeapi.co/media/sprites/pokemon/25.png",
        other: {
          dream_world: {
            front_default:
              "https://pokeapi.co/media/sprites/pokemon/other/dream-world/25.svg",
          },
          home: {},
        },
      },
      species: { name: "pikachu" },
      evolves_to: {
        is_baby: false,
        species: "pikachu",
        evolves_to: [
          {
            is_baby: false,
            species: "raichu",
            evolves_to: [
              {
                is_baby: false,
                species: "alolan-raichu",
                evolves_to: [],
              },
            ],
          },
        ],
      },
    });
  });

  it("should return true", () => {
    const pokemon = {
      id: 1,
      name: "pikachu",
      types: ["electric"],
      height: 0.4,
      weight: 6,
      sprites: {
        front_default: "https://pokeapi.co/media/sprites/pokemon/25.png",
        other: {
          dream_world: {
            front_default:
              "https://pokeapi.co/media/sprites/pokemon/other/dream-world/25.svg",
          },
          home: {},
        },
      },
      species: { name: "pikachu" },
    };
    const evolveItem = {
      chain: {
        species: { name: "pikachu" },
        evolves_to: [
          {
            species: { name: "raichu" },
            evolves_to: [
              {
                species: { name: "alolan-raichu" },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    };
    const catchPokemon = vi.fn();

    const result = evolveSelectedPokemon(pokemon, evolveItem, catchPokemon);

    expect(result).toBe(true);
  });
});
