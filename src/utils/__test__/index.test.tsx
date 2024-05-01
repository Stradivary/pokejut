import { describe, expect, it } from "vitest";
import { getPokemonImage } from "../image";
import { getColorByType } from "../constants";

describe("utils", () => {
    it("handle getPokemonImage", () => {
        const pokemon = {
            sprites: {
                other: {
                    dream_world: {
                        front_default: "https://example.com/image.png",
                    },
                },
            },
        };

        const pokemon2 = {
            sprites: {
                front_default: "https://example.com/image.png",
            },
        };

        expect(getPokemonImage(pokemon)).toBe("https://example.com/image.png");
        expect(getPokemonImage(pokemon2)).toBe("https://example.com/image.png");
    });

    it("handle getPokemonImage with no pokemon", () => {
        expect(getPokemonImage()).toBe("");
    });

    it("handle getColorByType", () => {
        const type = "fire";
        expect(getColorByType(type)).toBe("#FF6633");

        const type2 = "water";
        expect(getColorByType(type2)).toBe("#3399FF");
    });

    it("handle getColorByType with invalid type", () => {
        const type = "bluegrass";
        expect(getColorByType(type)).toBe("#fff");
    });
});