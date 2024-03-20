import { Berry } from "@/domain/entities/berries";

export interface BerryDataRepository {
    getBerryById(id: string): Promise<Berry>;
    getBerryByName(name: string): Promise<Berry>;
    getBerries(): Promise<Berry[]>;
}