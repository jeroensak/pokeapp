import React from "react";
import "./App.css";
import PokemonList from "./components/pokemonList";
import { ErrorContextProvider } from "./contexts/errorContext";

function App() {
  return (
    <div className="App">
      <ErrorContextProvider>
        <PokemonList />
      </ErrorContextProvider>
    </div>
  );
}

export default App;
