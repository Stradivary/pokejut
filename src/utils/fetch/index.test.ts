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
