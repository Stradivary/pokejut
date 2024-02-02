// PokemonAdapter.ts
import { Pokemon, PokemonSchema } from '../../../domain/entities/Pokemon'; // replace 'YourFileName' with the actual filename where Pokemon is defined
import { PokemonDTO } from '../../../domain/entities/Pokemon/DTO';

export class PokemonAdapter {

    static fromDTO(dto: PokemonDTO): Pokemon {
        return PokemonSchema.parse(dto);
    }
}
