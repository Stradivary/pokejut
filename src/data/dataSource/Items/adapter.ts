// PokemonItemAdapter.ts
import { PokemonItem, pokemonItemSchema } from '../../../domain/entities/Items'; // replace 'YourFileName' with the actual filename where PokemonItem is defined
import { pokemonItemDTOSchema, PokemonItemDTO } from '../../../domain/entities/Items/DTO';

export class PokemonItemAdapter {
    static toDTO(item: PokemonItem): PokemonItemDTO {
        return pokemonItemDTOSchema.parse(item);
    }

    static fromDTO(dto: PokemonItemDTO): PokemonItem {
        return pokemonItemSchema.parse(dto);
    }
}
