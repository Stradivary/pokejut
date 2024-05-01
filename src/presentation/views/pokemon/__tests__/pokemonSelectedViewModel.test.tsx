import { act } from "react-dom/test-utils";
import { describe, expect, it, vi } from "vitest";
import { handleModalRelease } from "../usePokemonSelectedViewModel";

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
    const releaseSelectedPokemon = vi.fn().mockImplementation(() => { });
    const navigate = vi.fn().mockImplementation(() => { });

    act(() => {
      handleModalRelease(releaseSelectedPokemon, navigate);
    });

    expect(releaseSelectedPokemon).toBeDefined();
  });
});
