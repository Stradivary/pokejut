// PokemonAdapter.ts
import { Pokemon, PokemonSchema } from '../../schema/Pokemon'; // replace 'YourFileName' with the actual filename where Pokemon is defined
import { pokemonDTOSchema, PokemonDTO } from '../../schema/Pokemon/DTO';

export class PokemonAdapter {
    static toDTO(item: Pokemon): PokemonDTO {
        // Perform the conversion from Pokemon to PokemonDTO,
        // because we're using zod, we can just use the schema to parse the object
        // additional custom casting can be done here
        // i.e: 
        // return pokemonDTOSchema.parse({
        //     ...item,
        //     customField: item.myCustomField 
        // });
        return pokemonDTOSchema.parse(item);
    }

    static fromDTO(dto: PokemonDTO): Pokemon {
        return PokemonSchema.parse(dto);
    }
}
