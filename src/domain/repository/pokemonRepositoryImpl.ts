import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

class PokemonRepository {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://beta.pokeapi.co/graphql/v1beta',
      cache: new InMemoryCache(),
    });
  }

  async getPokemonById(id: number) {
    const query = gql`
      query getPokemonById($id: Int!) {
        pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
          name
        }
      }
    `;
    return this.client.query({ query, variables: { id } });
  }

  async getPokemonByName(name: string) {
    const query = gql`
      query getPokemonByName($name: String!) {
        pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
          id
        }
      }
    `;
    return this.client.query({ query, variables: { name } });
  }

  async getPokemonByType(type: string) {
    const query = gql`
      query getPokemonByType($type: String!) {
        pokemon_v2_type(where: {name: {_eq: $type}}) {
          pokemon_v2_pokemontypes {
            pokemon_v2_pokemon {
              name
            }
          }
        }
      }
    `;
    return this.client.query({ query, variables: { type } });
  }

  async filterPokemonByName(name: string) {
    const query = gql`
      query filterPokemonByName($name: String!) {
        pokemon_v2_pokemon(where: {name: {_ilike: $name}}) {
          id
          name
        }
      }
    `;
    return this.client.query({ query, variables: { name } });
  }

  async getPokemonSpecies(id: number) {
    const query = gql`
      query getPokemonSpecies($id: Int!) {
        pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
          name
        }
      }
    `;
    return this.client.query({ query, variables: { id } });
  }

  async getPokemonEvolutionChain(pokemon_id: number) {
    const query = gql`
    query GetEvolutionChainByPokemonName($pokemon_id: String!) {
      pokemonDetail: pokemon_v2_pokemonspecies(order_by: {}, where: {id: {_eq: $pokemon_id}}) {
        id
        evolutionChain: pokemon_v2_evolutionchain {
          evolutionList: pokemon_v2_pokemonspecies(where: {evolves_from_species_id: {_eq: $pokemon_id}}) {
            id
            name
            evolves_from_species_id
            weightInfo: pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {
              weight
            }
          }
        }
        pokemonStats: pokemon_v2_pokemons {
          weight
          statsList: pokemon_v2_pokemonstats {
            statCategory: pokemon_v2_stat {
              name
            }
            base_stat
          }
        }
        name
      }
    }
    `;
    return this.client.query({ query, variables: { pokemon_id } });
  }

  async getPokemonEvolutionChainByPokemonName(name: string) {
    const query = gql`
    query GetEvolutionChainByPokemonName($name: String!) {
      species: pokemon_v2_pokemonspecies(where: {name: {_eq: $name}}) {
        evolution: pokemon_v2_evolutionchain {
          data: pokemon_v2_pokemonspecies {
            id,
            from: evolves_from_species_id
            name
          }
        }
      }
    }
    `;

    return this.client.query({ query, variables: { name } });
  }
}

export default PokemonRepository;
