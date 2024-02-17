// FILEPATH: /tests/fetch/index.test.ts

import { test } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { get } from ".";


const mock = new MockAdapter(axios);

test('should return data when GET request resolves', async ({ expect }) => {
    const data = { result: 'test' };
    mock.onGet('/test').reply(200, data);

    const response = await get('/test');

    expect(response).toEqual(data);
});

test('should throw an error when GET request rejects', async ({ expect }) => {
    mock.onGet('/test').reply(500);

    await expect(get('/test')).rejects.toThrow();
});

// TODO: FIX
// test('should add a new Pokemon to the list when catchPokemon is called', async ({ expect }) => {
//     const { catchPokemon } = useSimulator();

//     catchPokemon(pokemon);

//     const { pokemonList } = useSimulator.getState();
//     expect(pokemonList).toContainEqual(expect.objectContaining(pokemon));
// });

// test('should remove the selected Pokemon from the list when releaseSelectedPokemon is called', async ({ expect }) => {
//     const { catchPokemon, releaseSelectedPokemon } = useSimulator();

//     const pokemon = { name: 'Pikachu', species: { name: 'pikachu' }, weight: 10 };
//     catchPokemon(pokemon);

//     releaseSelectedPokemon();

//     const { pokemonList, selectedPokemon } = useSimulator.getState();
//     expect(pokemonList).not.toContainEqual(expect.objectContaining(pokemon));
//     expect(selectedPokemon).toBeUndefined();
// });

// test('should increase the weight of the selected Pokemon when feedPokemon is called with a berry', async ({ expect }) => {
//     const { catchPokemon, feedPokemon } = useSimulator();

//     const pokemon = { pokeId: 1, name: 'Pikachu', species: { name: 'pikachu' }, weight: 10 };
//     catchPokemon(pokemon);

//     const berry = { firmness: { name: 'firm' } };
//     feedPokemon(pokemon.pokeId, berry);

//     const { pokemonList, selectedPokemon } = useSimulator.getState();
//     expect(selectedPokemon?.weight).toBeGreaterThan(pokemon.weight);
//     expect(pokemonList).toContainEqual(expect.objectContaining(selectedPokemon));
// });

// test('should update the selected Pokemon when evolveSelectedPokemon is called', async ({ expect }) => {
//     const { catchPokemon, evolveSelectedPokemon } = useSimulator();

//     const pokemon = { name: 'Pikachu', species: { name: 'pikachu' }, weight: 10 };
//     catchPokemon(pokemon);

//     const evolvedPokemon = { species: { name: 'raichu' } };
//     evolveSelectedPokemon(evolvedPokemon);

//     const { pokemonList, selectedPokemon } = useSimulator.getState();
//     expect(selectedPokemon?.species?.name).toBe(evolvedPokemon.species.name);
//     expect(pokemonList).toContainEqual(expect.objectContaining(selectedPokemon));
// });