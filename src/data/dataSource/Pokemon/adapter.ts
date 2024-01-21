// PokemonAdapter.ts
import { Pokemon, PokemonSchema } from '../../../domain/entities/Pokemon'; // replace 'YourFileName' with the actual filename where Pokemon is defined
import { pokemonDTOSchema, PokemonDTO } from '../../../domain/entities/Pokemon/DTO';

export class PokemonAdapter {
    static toDTO(item: Pokemon): PokemonDTO {
        return pokemonDTOSchema.parse(item);
    }

    static fromDTO(dto: PokemonDTO): Pokemon {
        return PokemonSchema.parse(dto);
    }
}
