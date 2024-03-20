import { EvolutionChain } from "@/domain/entities/evolution";


export function findEvolutionChain(data: EvolutionChain | null, currentSpecies: string): EvolutionChain | null {
    // Check if data is null or undefined
    if (!data) {
        return null;
    }

    // Check if species property exists and matches the current species
    if (data.species && data.species.name.toLowerCase() === currentSpecies.toLowerCase()) {
        return data;
    }

    // Iterate through evolves_to array if it exists
    if (data.evolves_to) {
        for (const evolution of data.evolves_to) {
            // Recursive call with additional null check
            const nextEvolution = findEvolutionChain(evolution, currentSpecies);
            if (nextEvolution) {
                return nextEvolution;
            }
        }
    }

    // Return null if no matching species or next evolution is found
    return null;
}