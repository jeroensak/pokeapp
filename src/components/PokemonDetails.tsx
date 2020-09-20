import React from "react";
import { useGetPokemonDetails } from "../hooks/useGetPokemonDetails";
import { Pokemon } from "../models/pokemon";
import { PokemonSummary } from "../models/pokemonSummary";

interface PokemonDetailsProps {
  pokemonSummary: PokemonSummary;
}

const PokemonDetails = ({ pokemonSummary }: PokemonDetailsProps) => {
  const pokemon = useGetPokemonDetails(pokemonSummary.name);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <>
      <div>
        <strong>{pokemon.name}</strong> / {pokemon.id} / {pokemon.height} /{" "}
        {pokemon.weight}
      </div>
      <div>
        <strong>Moves: </strong>
        {pokemon.moves.map(({ move }, index, array) => (
          <React.Fragment key={move.name}>
            <a href={move.url}>{move.name}</a>
            {index < array.length - 1 && <span> / </span>}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default PokemonDetails;
