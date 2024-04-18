import { expect } from "vitest";
import snapshotSanitizer from "./snapshot-sanitizer";

expect.addSnapshotSerializer(snapshotSanitizer);