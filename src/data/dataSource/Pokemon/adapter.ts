// PokemonAdapter.ts
import { Pokemon, PokemonSchema } from '../../../domain/entities/Pokemon'; // replace 'YourFileName' with the actual filename where Pokemon is defined
import { PokemonDTO } from '../../../domain/entities/Pokemon/DTO';

export class PokemonAdapter {

    static fromDTO(dto: PokemonDTO): Pokemon {
        return {
            height: dto.height,
            id: Number(dto.id),
            name: dto.name,
            species: { name: dto.species.name, url: dto.species.url },
            sprites: dto.sprites,
            types: dto.types.map(({ slot, type }) => ({ slot, type: { name: type.name, url: type.url } })),
            weight: dto.weight
        } satisfies Pokemon;
    }
}
