import { describe, expect, it } from 'vitest';
import PokemonRepository from './pokemonRepositoryRestImpl';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

describe('PokemonRepository', () => {
    const repository = new PokemonRepository();

    it('should get the list of pokemons', async () => {
        const mockResponse = { data: ['pokemon1', 'pokemon2'] };

        mock.onGet('https://pokeapi.co/api/v2/pokemon').reply(200, mockResponse);

        const result = await repository.getPokemonList({ offset: 0, limit: 10 });

        expect(result.data).toEqual(mockResponse.data);
    });

    it('should handle error when getting the list of pokemons', async () => {
        mock.onGet('https://pokeapi.co/api/v2/pokemon').reply(500);

        try {
            await repository.getPokemonList({ offset: 0, limit: 10 });
        } catch (error) {
            if (error instanceof Error) {
                expect(error?.message).toEqual('Request failed with status code 500');
            } 
        }
    });

    it('should get a pokemon by id', async () => {
        const mockResponse = { data: { id: 1, name: 'bulbasaur' } };

        mock.onGet('https://pokeapi.co/api/v2/pokemon/1').reply(200, mockResponse);
        const result = await repository.getPokemonById(1);

        expect(result?.data).toEqual(mockResponse.data);
    });

    it('should get a pokemon by name', async () => {
        const mockResponse = { data: { id: 1, name: 'bulbasaur' } };
        mock.onGet('https://pokeapi.co/api/v2/pokemon/bulbasaur').reply(200, mockResponse);

        const result = await repository.getPokemonByName('bulbasaur');

        expect(result.data).toEqual(mockResponse.data);
    });

    // Add more tests for other methods in PokemonRepository
});