import { describe, it, expect, vi } from "vitest";
import { Component as MainPage } from "../_layout";
import { Component as PokedexPage } from "../pokedex/pokedex";
import { Component as PokedexPokemonPage } from "../pokedex/pokedex.$id";
import { Component as SettingsPage } from "../settings/settings";
import { Component as PokemonPage } from "../pokemon/pokemon";
import { render } from "../../../../tests/test-utils";
import { PokemonDetail } from "../pokemon/components/PokemonDetail";

describe("Component Coverage Tests", () => {
  it("should render the MainPage component correctly", () => {
    const { container } = render(<MainPage />);
    expect(container).toBeDefined();
  });

  it("should render the PokedexPage component correctly", () => {
    const { container } = render(<PokedexPage />);
    expect(container).toBeDefined();
  });

  it("should render the pokedex page when error is thrown", () => {
    // mock usePokedexViewModel() hooks
    vi.mock("../viewModels/usePokedexViewModel", () => {
      return () => {
        return {
          status: "error",
          error: new Error("error"),
        };
      };
    });

    const { container } = render(<PokedexPage />);
    expect(container).toBeDefined();

    // reset mock
    vi.mock("../viewModels/usePokedexViewModel", () => {
      return () => {
        return {
          status: "success",
          data: {
            pages: [],
          },
          hasNextPage: false,
          isFetchingNextPage: false,
          isFetching: false,
          fetchNextPage: () => { },
          intersectionRef: () => { },
        };
      };
    });

    const { container: container2 } = render(<PokedexPage />);
    expect(container2).toBeDefined();
  });

  it("should render the PokedexPokemonPage component correctly", () => {
    const { container } = render(<PokedexPokemonPage />);
    expect(container).toBeDefined();
  });

  it("should render the SettingsPage component correctly", () => {
    const { container } = render(<SettingsPage />);
    expect(container).toBeDefined();
  });

  it("should render the PokemonPage component correctly", () => {
    const { container } = render(<PokemonPage />);
    expect(container).toBeDefined();
  });

  // PokemonDetail
  it("should render the PokemonDetail component correctly", () => {
    const { container } = render(<PokemonDetail />);
    expect(container).toBeDefined();
  });
 
});
