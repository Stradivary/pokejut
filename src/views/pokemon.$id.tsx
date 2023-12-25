import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { PokemonDetail } from "../components/PokemonDetail";
import usePokemonStore from "../services/simulator";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {
    const { pokemonList } = usePokemonStore();
    if (pokemonList.length === 0) {
        return (
            <div style={{ width: "100%" }}>
                <Link to=".." unstable_viewTransition>
                    <Button  >
                        Back
                    </Button>
                </Link>
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>Belum ada pokemon</h1>
                </div>
            </div>
        );
    }
    return (
        <div style={{ width: "100%" }}>
            <Link to=".." unstable_viewTransition>
                <Button  >
                    Back
                </Button>
            </Link>

            <PokemonDetail />

        </div>
    );
}

Component.displayName = 'PokedexPokemonPage';