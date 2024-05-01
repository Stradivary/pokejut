export const pokemonData = [
    { type: "bug", color: "#90c12c", img: "/icons/bug.svg" },
    { type: "dark", color: "#333333", img: "/icons/dark.svg" },
    { type: "dragon", color: "#096dc4", img: "/icons/dragon.svg" },
    { type: "electric", color: "#FFCC33", img: "/icons/electric.svg" },
    { type: "fairy", color: "#FF99CC", img: "/icons/fairy.svg" },
    { type: "fighting", color: "#FF3333", img: "/icons/fighting.svg" },
    { type: "fire", color: "#FF6633", img: "/icons/fire.svg" },
    { type: "flying", color: "#6699FF", img: "/icons/flying.svg" },
    { type: "ghost", color: "#5269ac", img: "/icons/ghost.svg" },
    { type: "grass", color: "#63bb5b", img: "/icons/grass.svg" },
    { type: "ground", color: "#d97746", img: "/icons/ground.svg" },
    { type: "ice", color: "#99FFFF", img: "/icons/ice.svg" },
    { type: "normal", color: "#9099a1", img: "/icons/normal.svg" },
    { type: "poison", color: "#AA66CC", img: "/icons/poison.svg" },
    { type: "psychic", color: "#FF6699", img: "/icons/psychic.svg" },
    { type: "rock", color: "#CC9966", img: "/icons/rock.svg" },
    { type: "steel", color: "#5a8ea1", img: "/icons/steel.svg" },
    { type: "water", color: "#3399FF", img: "/icons/water.svg" },
];

export const firmnesColor: Record<string, string> = {
    "very-soft": "blue",
    soft: "green",
    hard: "yellow",
    "very-hard": "orange",
    "super-hard": "red",
};

export const berriesGain: Record<string, number> = {
    'very-soft': 2,
    'soft': 3,
    'hard': 5,
    'very-hard': 8,
    'super-hard': 10,
};

export const statIcons: Record<string, string> = {
    hp: '❤️',
    attack: '⚔️',
    defense: '🛡️',
    speed: '⚡',
    'special-attack': '🔥',
    'special-defense': '🔵',
};

export const statLabels: Record<string, string> = {
    height: 'Tinggi Pokemon',
    weight: 'Berat Pokemon',
    hp: 'Health Points',
    attack: 'Attack',
    defense: 'Defense',
    speed: 'Speed',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense',
};

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