import Api, { IApi } from "../api/api";
import { Pokemon } from "../models/pokemon";
import { PokemonSummary } from "../models/pokemonSummary";

interface PokemonSummaryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonSummary[];
}

class PokemonService {
  private Api: IApi;

  constructor() {
    this.Api = new Api("https://pokeapi.co/api/v2");
  }

  public getListOfPokemons = async (limit: number, offset: number) => {
    let queryParams = {
      limit: limit.toString(),
      offset: offset.toString(),
    };

    const pokemon = await this.Api.get<PokemonSummaryResponse>(
      "/pokemon",
      queryParams
    );
    return pokemon;
  };

  public getPokemonDetailsByName = async (name: string) => {
    const details = await this.Api.get<Pokemon>(`/pokemon/${name}`);
    return details;
  };
}

export default new PokemonService();
