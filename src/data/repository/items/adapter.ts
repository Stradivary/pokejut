// PokemonItemAdapter.ts
import { PokemonItem, pokemonItemSchema } from '../../schema/Items'; // replace 'YourFileName' with the actual filename where PokemonItem is defined
import { pokemonItemDTOSchema, PokemonItemDTO } from '../../schema/Items/DTO';

export class PokemonItemAdapter {
    static toDTO(item: PokemonItem): PokemonItemDTO {
        // Perform the conversion from PokemonItem to PokemonItemDTO,
        // because we're using zod, we can just use the schema to parse the object
        // additional custom casting can be done here
        // i.e: 
        // return pokemonItemDTOSchema.parse({
        //     ...item,
        //     customField: item.myCustomField 
        // });
        return pokemonItemDTOSchema.parse(item);
    }

    static fromDTO(dto: PokemonItemDTO): PokemonItem {
        return pokemonItemSchema.parse(dto);
    }
}
