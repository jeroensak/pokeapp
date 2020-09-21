import React from "react";
import { useShowError } from "../contexts/errorContext";
import { PokemonSummary } from "../models/pokemonSummary";
import pokemonService from "../services/pokemonService";

export const useGetPokemonList = () => {
  const [data, setData] = React.useState<PokemonSummary[] | null>(null);
  const showError = useShowError()

  React.useEffect(() => {
    (async () => {
      const list = await pokemonService.getListOfPokemons(100, 0);
      if (list.error || !list.data) {
        showError("something went wrong");
        return;
      }

      setData(list.data.results);
    })();
  }, []);

  return data;
};
