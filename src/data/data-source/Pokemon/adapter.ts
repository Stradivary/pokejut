// PokemonAdapter.ts
import { Pokemon } from '@/domain/entities/pokemon'; // replace 'YourFileName' with the actual filename where Pokemon is defined
import { PokemonDTO } from '@/domain/entities/pokemon/DTO';

export class PokemonAdapter {

    static fromDTO(dto: PokemonDTO): Pokemon {
        return {
            height: dto.height,
            id: Number(dto.id),
            name: dto.name,
            species: { name: dto.species.name, url: dto.species.url },
            sprites: dto.sprites,
            types: dto.types.map(({ slot, type }) => ({ slot, type: { name: type.name } })),
            weight: dto.weight, 
        } satisfies Pokemon ;
    }
}
