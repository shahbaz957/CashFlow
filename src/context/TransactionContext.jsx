import React, { createContext, useReducer } from "react";

export const TransactionContext = createContext();

const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE":
      return {
        ...state, // this is the previous state that you are maintaining
        transactions: state.transactions.filter(
          (item) => item.id != action.payload
        ),
      };
    case "SET":
      return {
        ...state,
        transactions: action.payload,
      };
    case "EDIT":
      return {
        ...state,
        transactions: state.transactions.map((item) => 
          item.id === action.payload.id
            ? { ...item, amount: Number(action.payload.amount) }
            : item
        )
      };
    default:
      return state; // original state
  }
};

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // just uses Transaction Provider to define UseReducer Hook

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}
