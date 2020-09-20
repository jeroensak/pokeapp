import React from "react";
import { render } from "@testing-library/react";
import { ErrorContextProvider } from "../contexts/errorContext";

export const renderWithWrapper = (ui: React.ReactElement) => {
  return render(<ErrorContextProvider>{ui}</ErrorContextProvider>);
};
