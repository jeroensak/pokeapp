import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetch from "jest-fetch-mock";
import React from "react";
import PokemonList from "../components/pokemonList";
import { renderWithWrapper } from "./renderWithWrapper";

describe("Pokemon list Integration", () => {
  it("should render a list of pokemons", async () => {
    const mockPokemonSummary = {
      results: [
        { name: "bulbasaur", url: "http://bulbasaur" },
        { name: "chicorita", url: "http://chicorita" },
        { name: "charizard", url: "http://charizard" },
      ],
    };

    fetch.mockResponseOnce(JSON.stringify(mockPokemonSummary));

    renderWithWrapper(<PokemonList />);

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeVisible();
      expect(screen.getByText("chicorita")).toBeVisible();
      expect(screen.getByText("charizard")).toBeVisible();
    });
  });

  it("should show the details of a selected pokemon", async () => {
    const mockPokemonSummary = {
      results: [{ name: "bulbasaur", url: "http://bulbasaur" }],
    };
    const mockBulbasaurDetails = {
      name: "bulbasaur",
      id: "1",
      weight: 1000,
      height: 10,
      moves: [{ move: { name: "tackle", url: "http://tackle" } }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockPokemonSummary));

    renderWithWrapper(<PokemonList />);

    const bulbasaur = await screen.findByText("bulbasaur");

    fetch.mockResponseOnce(JSON.stringify(mockBulbasaurDetails));

    userEvent.click(bulbasaur);

    await waitFor(() => {
      expect(screen.getAllByText("bulbasaur")).toHaveLength(2); // once from the list, once from the details
      expect(screen.getByText("/ 1 / 10 / 1000")).toBeVisible();
      expect(screen.getByText("tackle")).toHaveAttribute(
        "href",
        "http://tackle"
      );
    });
  });

  it("should show an error when fetching the list", async () => {
    const spy = jest.spyOn(global.console, "error").mockImplementationOnce(() => {});
    fetch.mockRejectOnce(new Error());

    renderWithWrapper(<PokemonList />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    spy.mockRestore()
  });
});
