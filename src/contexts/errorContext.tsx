import React from "react";

interface ErrorContextExpose {
  showError: (error: string) => void;
}

export const ErrorContext = React.createContext<ErrorContextExpose>({
  showError: (error: string) => {
    throw "ErrorContext used without provider";
  },
});

export const ErrorContextProvider: React.FC = ({ children }) => {
  const showError = (error: string) => {
    // do something, figure it out later
    console.error(error);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useShowError = () => {
  const { showError } = React.useContext(ErrorContext);

  return showError;
};
