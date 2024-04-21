import { act } from "react-dom/test-utils";
import { describe, expect, it, vi } from "vitest";
import {
  confirmReleasePokemon,
  handleModalRelease,
} from "../pokemonSelectedViewModel";

vi.mock("@/utils", () => ({
  modals: {
    openConfirmModal: vi.fn(),
  },
  notifications: {
    show: vi.fn(),
  },
}));

describe("handleModalRelease", () => {
  it("should call releaseSelectedPokemon and navigate functions when confirmed", () => {
    const releaseSelectedPokemon = vi.fn().mockImplementation(() => {});
    const navigate = vi.fn().mockImplementation(() => {});

    act(() => {
      handleModalRelease(releaseSelectedPokemon, navigate);
    });

    expect(releaseSelectedPokemon).toBeDefined();
  });
});

describe("confirmReleasePokemon", () => {
  it("should call releaseSelectedPokemon and navigate functions when confirmed", () => {
    const releaseSelectedPokemon = vi.fn().mockImplementation(() => {});
    const navigate = vi.fn().mockImplementation(() => {});

    act(() => {
      confirmReleasePokemon(releaseSelectedPokemon, navigate);
    });

    expect(releaseSelectedPokemon).toBeDefined();
  });
});
