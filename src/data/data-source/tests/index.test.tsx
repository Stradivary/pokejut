import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RemoteDataSource } from "../remoteDataSource";
import { LocalDataSource } from "../localDataSource";

const mock = new MockAdapter(axios);

describe("RemoteDataSource", () => {
  const url = "https://example.com";
  const path = "/api/data";
  const dataSource = new RemoteDataSource(url, path);

  it("should call the getAll method and return data", async () => {
    const data = { id: 1, name: "Test Data" };
    mock.onGet(`${url}${path}`).reply(200, data);

    const result = await dataSource.getAll();

    expect(result).toEqual(data);
  });

  it("should catch an error when the getAll method fails", async () => {
    mock.onGet(`${url}${path}`).reply(500);
    dataSource.url = "httpa//example.com";
    dataSource.path = "/api/invalid21!@$^#:";
    await expect(dataSource.getAll()).rejects.toThrowError(
      "Get All Error Invalid URL"
    );

    dataSource.url = url;
    dataSource.path = path;
  });

  it("should call the getById method with the correct id and return data", async () => {
    const id = "123";
    const data = { id: 123, name: "Test Data" };
    mock.onGet(`${url}${path}/${id}`).reply(200, data);

    const result = await dataSource.getById(id);

    expect(result).toEqual(data);
  });

  it("should reject with an error when getAll request fails", async () => {
    mock.onGet(`${url}${path}`).reply(500);

    await expect(dataSource.getAll()).rejects.toThrowError(
      "Request failed with status code 500"
    );
  });

  it("should reject with an error when the GetById method fails", async () => {
    mock.onGet(`${url}${path}/123`).reply(500);

    await expect(dataSource.getById("123")).rejects.toThrowError(
      "Request failed with status code 500"
    );
  });

  it("should catch an error when the getById method fails", async () => {
    mock.onGet(`${url}${path}`).reply(500);
    dataSource.url = "httpa//example.com";
    dataSource.path = "/api/invalid21!@$^#:";
    await expect(dataSource.getById("1")).rejects.toThrowError(
      "Get By Id Error Invalid URL"
    );

    dataSource.url = url;
    dataSource.path = path;
  });

  it("should reject with an error when getById request fails", async () => {
    const id = "123";
    dataSource.url = url;
    dataSource.path = path;
    mock.onGet(`${url}${path}/${id}`).reply(500);

    await expect(dataSource.getById(id)).rejects.toThrowError(
      "Request failed with status code 500"
    );
  });

  it("should reject with an error when an unknown error occurs", async () => {
    mock.onGet(`${url}${path}`).networkError();

    await expect(dataSource.getAll()).rejects.toThrowError("Network Error");
  });

  it("should initialize without any errors", async () => {
    await expect(dataSource.initialize()).resolves.not.toThrow();
  });
});

describe("LocalDataSource", () => {
  const mockData = {
    pokemon1: { name: "Pikachu", type: "Electric" },
    pokemon2: { name: "Charizard", type: "Fire" },
  };

  const mockUrl = "test-url";
  const mockPath = "test-path";

  let dataSource: LocalDataSource<any>;

  beforeEach(() => {
    dataSource = new LocalDataSource(mockUrl, mockPath, mockData);
  });

  it("should return all data when getAll is called", async () => {
    const result = await dataSource.getAll();

    expect(result).toEqual(mockData);
  });

  it("should return data by id when getById is called", async () => {
    const id = "pokemon1";
    const result = await dataSource.getById(id);

    expect(result).toEqual(mockData[id]);
  });

  it("should initialize data from JSON file", async () => {
    const mockJsonData = {
      testPath: {
        pokemon3: { name: "Bulbasaur", type: "Grass" },
        pokemon4: { name: "Squirtle", type: "Water" },
      },
    };

    vi.mock("../raw-data/test-url.json", () => mockJsonData);

    dataSource = new LocalDataSource(mockUrl, mockPath);

    await dataSource.initialize();

    expect(await dataSource.getAll()).toEqual({});
  });
});
