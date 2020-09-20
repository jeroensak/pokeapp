import React from "react";
import { useGetPokemonList } from "../hooks/useGetPokemonList";
import { PokemonSummary } from "../models/pokemonSummary";
import PokemonDetails from "./PokemonDetails";
import PokemonSummaryButton from "./PokemonSummary";

const PokemonList = () => {
  const [
    selectedPokemon,
    setSelectedPokemon,
  ] = React.useState<PokemonSummary | null>(null);
  const pokemons = useGetPokemonList();

  if (!pokemons) return <div>loading...</div>;

  return (
    <>
      <div>
        {pokemons.map((p) => (
          <PokemonSummaryButton
            pokemon={p}
            onClick={setSelectedPokemon}
            key={p.name}
          />
        ))}
      </div>
      {selectedPokemon && <PokemonDetails pokemonSummary={selectedPokemon} />}
    </>
  );
};

export default PokemonList;
