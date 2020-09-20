import fetch from "jest-fetch-mock";
import pokemonService from "./pokemonService";

describe("pokemonGetter", () => {
  it("should get 3 pokemon", async () => {
    const mockResponse = {
      results: [
        { name: "bulbasaur", url: "http://bulbasaur" },
        { name: "chicorita", url: "http://chicorita" },
        { name: "charizard", url: "http://charizard" },
      ],
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const response = await pokemonService.getListOfPokemons(3, 0);
    expect(response.data?.results).toHaveLength(3);
  });

  it('should get bulbasaur by name', async () => {
    const mockResponse = {
      name: "bulbasaur",
      id: "1",
      weight: 1000,
      height: 10,
      moves: [{ move: { name: "tackle", url: "http://tackle" } }],
    }

    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const response = await pokemonService.getPokemonDetailsByName('bulbasaur')
    expect(response.data).toEqual(mockResponse)
  })
});
