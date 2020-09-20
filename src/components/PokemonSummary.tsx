import React from "react";
import { PokemonSummary } from "../models/pokemonSummary";

interface PokemonSummaryButtonProps {
  pokemon: PokemonSummary;
  onClick: (pokemon: PokemonSummary) => void;
}

const PokemonSummaryButton = ({
  pokemon,
  onClick,
}: PokemonSummaryButtonProps) => (
  <button onClick={() => onClick(pokemon)}>{pokemon.name}</button>
);

export default PokemonSummaryButton;
