import React from "react";
import { useShowError } from "../contexts/errorContext";
import { Pokemon } from "../models/pokemon";
import pokemonService from "../services/pokemonService";

export const useGetPokemonDetails = (pokemonName: string) => {
  const [pokemonDetails, setPokemonDetails] = React.useState<Pokemon | null>(
    null
  );
  const showError = useShowError()

  React.useEffect(() => {
    (async () => {
      const response = await pokemonService.getPokemonDetailsByName(
        pokemonName
      );
      if (response.error) {
        showError("something went wrong");
        return;
      }
      setPokemonDetails(response.data);
    })();
  }, [pokemonName]);

  return pokemonDetails;
};
