
export function getPokemonImage(pokemon?: {
    [x: string]: any;
}): any {

    if (!pokemon) {
        return "";
    }

    if (pokemon.sprites?.other?.["dream_world"]?.front_default) {
        return pokemon.sprites.other["dream_world"].front_default;
    }

    return pokemon?.sprites?.front_default;


}