
export const berriesGain: Record<string, number> = {
    'very-soft': 20,
    'soft': 30,
    'hard': 50,
    'very-hard': 80,
    'super-hard': 100,
};

export const getBerryGain = (firmness?: string) => {
    return berriesGain[firmness ?? ""] ?? 1;
}; 