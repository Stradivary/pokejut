import { beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "~/tests/test-utils";
import { Component as Settings } from "../settings";
import snapshotSanitizer from "~/tests/snapshot-sanitizer";



vi.mock('../useSettingsViewModel', () => ({
  useSettingsViewModel: vi.fn(() => ({
    colorScheme: "light",
    setColorScheme: vi.fn(),
    colorSchemeOptions: ["light", "dark"],
    cacheSizeInMB: 10,
    handleClearCache: vi.fn(),
    canReleaseCollection: false,
    handleReleaseCollection: vi.fn(),
  }))
}));

describe("Settings Component", () => {
  beforeAll(() => {
    expect.addSnapshotSerializer(snapshotSanitizer);
  });
  it("should render the component correctly", () => {
    const { container } = render(<Settings />);
    expect(container).toMatchSnapshot();
  });
});

