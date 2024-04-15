import localForage from 'localforage';
import { StateStorage } from 'zustand/middleware';

const db = localForage.createInstance({
    name: 'pokemonDB',
    storeName: 'data',
});

export const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await db.getItem(name)) as string;
    },
    setItem: async (name: string, value: string): Promise<void> => {
        db.setItem(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
        db.removeItem(name);
    },
};