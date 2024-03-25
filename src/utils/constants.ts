export const pokemonData = [
    { type: "bug", color: "#99CC33", img: "/types/bug.svg" },
    { type: "dark", color: "#333333", img: "/types/dark.svg" },
    { type: "dragon", color: "#7038F8", img: "/types/dragon.svg" },
    { type: "electric", color: "#FFCC33", img: "/types/electric.svg" },
    { type: "fairy", color: "#FF99CC", img: "/types/fairy.svg" },
    { type: "fighting", color: "#FF3333", img: "/types/fighting.svg" },
    { type: "fire", color: "#FF6633", img: "/types/fire.svg" },
    { type: "flying", color: "#6699FF", img: "/types/flying.svg" },
    { type: "ghost", color: "#6666CC", img: "/types/ghost.svg" },
    { type: "grass", color: "#66CC33", img: "/types/grass.svg" },
    { type: "ground", color: "#FFCC66", img: "/types/ground.svg" },
    { type: "ice", color: "#99FFFF", img: "/types/ice.svg" },
    { type: "normal", color: "#FFCC99", img: "/types/normal.svg" },
    { type: "poison", color: "#AA66CC", img: "/types/poison.svg" },
    { type: "psychic", color: "#FF6699", img: "/types/psychic.svg" },
    { type: "rock", color: "#CC9966", img: "/types/rock.svg" },
    { type: "steel", color: "#CCCCCC", img: "/types/steel.svg" },
    { type: "water", color: "#3399FF", img: "/types/water.svg" },
];

export function getColorByType(pokemonType: string) {
    const foundPokemon = pokemonData.find(
        (pokemon) => pokemon.type === pokemonType
    );
    if (foundPokemon) {
        return foundPokemon.color;
    } else {
        return "#fff";
    }
}