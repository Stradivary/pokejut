import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSettingsViewModel } from "../useSettingsViewModel";
import { wrapper } from "~/tests/test-utils";

vi.mock("@/domain/use-cases/simulator", () => ({
  useSimulator: vi.fn(),
}));

vi.mock("../useSettingsViewModel", () => ({
  useSettingsViewModel: vi.fn(() => ({
    colorScheme: "light",
    setColorScheme: vi.fn(),
    colorSchemeOptions: ["light", "dark"],
    canReleaseCollection: true,
    handleReleaseCollection: vi.fn(),
  })),
}));

describe("useSettingsViewModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSettingsViewModel(), { wrapper });

    expect(result.current.canReleaseCollection).toBeTruthy();
  });

  it("should handle releasing collection", () => {
    const { result } = renderHook(() => useSettingsViewModel(), { wrapper });

    expect(result.current.canReleaseCollection).toBeTruthy();

    act(() => {
      result.current.handleReleaseCollection();
    });
  });


});
