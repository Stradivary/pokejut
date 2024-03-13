
export const berriesGain: Record<string, number> = {
    'very-soft': 2,
    'soft': 3,
    'hard': 5,
    'very-hard': 8,
    'super-hard': 10,
};

export const getBerryGain = (firmness?: string) => {
    return berriesGain[firmness ?? ""] ?? 1;
}; 