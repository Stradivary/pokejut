import { describe, expect, it, vi } from "vitest";
import { render } from "~/tests/test-utils";
import { Component as MainPage } from "../views/_layout";
import { Component as PokedexPage } from "../views/pokedex/pokedex";
import { mockIntersectionObserver } from "../../../tests/mockIntersectionObserver";

import { Component as SettingsPage } from "../views/settings/settings";
import { PokemonTypeBadge } from "../components/PokemonTypeBadge";

describe("Component Coverage Tests", () => {
  it("should render the MainPage component correctly", () => {
    const { container } = render(<MainPage />);
    expect(container).toBeDefined();
  });

  it("should render the PokedexPage component correctly", () => {
    mockIntersectionObserver([true]);
    const { container } = render(<PokedexPage />);
    expect(container).toBeDefined();
  });

  it("should render the pokedex page when error is thrown", () => {
    // mock usePokedexViewModel() hooks
    vi.mock("../view-models/usePokedexViewModel", () => {
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
    vi.mock("../view-models/usePokedexViewModel", () => {
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

  it("should render the SettingsPage component correctly", () => {
    const { container } = render(<SettingsPage />);
    expect(container).toBeDefined();
  });

  it("should render the PokemonTypeBadge component correctly", () => {
    const { container } = render(<PokemonTypeBadge type={{
      name: "grass"
    }} />);
    expect(container).toBeDefined();
  });

});
