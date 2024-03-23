interface IPokemonRepository {
  getPokemonById(id: number): Promise<any>;
  getPokemonByName(name: string): Promise<any>;
  getPokemonByType(type: string): Promise<any>;
  filterPokemonByName(name: string): Promise<any>;
  getPokemonSpecies(id: number): Promise<any>;
  getPokemonEvolutionChain(id: number): Promise<any>;
}
export default IPokemonRepository;
