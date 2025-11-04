import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
function TransactionItem({ object }) {
  const isIncome = object.type === "income";
  const { dispatch } = useContext(TransactionContext);

  return (
    <div
      className={`flex items-center justify-between w-full p-4 rounded-xl shadow-sm border 
      ${isIncome ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}
      `}
    >
      <p
        className={`text-sm font-medium 
        ${isIncome ? "text-green-700" : "text-red-700"}
        `}
      >
        {isIncome ? "Income" : "Expense"}
      </p>

      <h2
        className={`text-lg font-semibold 
        ${isIncome ? "text-green-600" : "text-red-600"}
        `}
      >
        {object.amount}
      </h2>
      <button onClick={() => dispatch({ type: "DELETE", payload: object.id })}>
        ❌
      </button>
    </div>
  );
}

export default TransactionItem;
