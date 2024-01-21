import { PokemonItem } from "@/domain/entities/Items";

export interface ItemsDataRepository {
    getItemById(id: string): Promise<PokemonItem>;
    getItemByName(name: string): Promise<PokemonItem>;
    getItems(): Promise<PokemonItem[]>;
}