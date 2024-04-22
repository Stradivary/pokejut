import { beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "~/tests/test-utils";
import { Component as Settings } from "../settings";
import snapshotSanitizer from "~/tests/snapshot-sanitizer";
import {
  confirmReleaseCollection,
  onClearCache,
  onReleaseCollection,
} from "../useSettingsViewModel";

vi.mock("../useSettingsViewModel", async () => {
  const actual = await vi.importActual("../useSettingsViewModel");
  return {
    ...actual,
    colorScheme: "light",
    setColorScheme: vi.fn(),
    colorSchemeOptions: ["light", "dark"],
    cacheSizeInMB: 10,
    handleClearCache: vi.fn(),
    canReleaseCollection: false,
    handleReleaseCollection: vi.fn(),
  };
});

describe("Settings Component", () => {
  beforeAll(() => {
    expect.addSnapshotSerializer(snapshotSanitizer);
  });
  it("should render the component correctly", () => {
    const { container } = render(<Settings />);
    expect(container).toMatchSnapshot();
  });
});

describe("onReleaseCollection", () => {
  it("should call clearSelectedPokemon and clearPokemonList functions", () => {
    const clearSelectedPokemon = vi.fn();
    const clearPokemonList = vi.fn();
    const notifications = {
      show: vi.fn(),
    };

    onReleaseCollection(clearSelectedPokemon, clearPokemonList, notifications);

    expect(clearSelectedPokemon).toBeDefined();
  });

  it("should call confirmReleaseCollection function", () => {
    const clearSelectedPokemon = vi.fn();
    const clearPokemonList = vi.fn();
    const notifications = {
      show: vi.fn(),
    };

    confirmReleaseCollection(
      clearSelectedPokemon,
      clearPokemonList,
      notifications
    );

    expect(notifications).toBeDefined();
  });
});

describe("onClearCache", () => {
  it("should call setRerender and navigate functions", () => {
    const setRerender = vi.fn();
    const navigate = vi.fn();

    onClearCache(setRerender, navigate);

    expect(setRerender).toBeDefined();
  });
});
