import { Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { CardPokemon } from "../../components/CardPokemon";

/**
 * Pokedex detail page
 * @returns Pokedex detail page
 */
export function Component() {
    const { id } = useParams();


    return (
        <div style={{ width: "100%" }}>
            <Link to=".." unstable_viewTransition>
                <Button  >
                    Back
                </Button>
            </Link>
            <CardPokemon pokemonName={id ?? ""} />

        </div>
    );
}

Component.displayName = 'PokedexPokemonPage';