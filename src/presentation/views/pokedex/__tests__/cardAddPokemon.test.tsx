import { fireEvent } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";
import { render } from "~/tests/test-utils";
import CardAddPokemon from "../components/cardAddPokemon";

vi.mock("@/domain/use-cases/evolution", async () => {
    const original = await vi.importActual("@/domain/use-cases/evolution");

    return {
        ...original,
        addSelectedPokemon: vi.fn().mockImplementation(() => true),
    };
});

describe("CardAddPokemon", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should call addSelectedPokemon and show success notification when successful", async () => {


        const { findByTestId } = render(<CardAddPokemon pokemonName={""} />);

        const selectButton = await findByTestId("select-pokemon") as HTMLButtonElement;
        fireEvent.click(selectButton);

    });


});