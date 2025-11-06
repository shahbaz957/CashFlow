import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
function Form() {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState(null);
  const {dispatch} = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
        type: "ADD" ,
        payload : {
            id : Date.now() , type , amount : Number(amount)
        }
    })
    setAmount(0);
    setType("income");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount Input */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Amount</label>
          <input
            type="number"
            required
            placeholder="Enter amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Radio Buttons */}
        <div>
          <p className="text-gray-700 font-medium mb-2">Select Type</p>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={type === "expense"}
                onChange={(e) => setType(e.target.value)}
                className="h-4 w-4 text-red-500"
              />
              <span className="text-red-600 font-medium">Expense</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="income"
                checked={type === "income"}
                onChange={(e) => setType(e.target.value)}
                className="h-4 w-4 text-green-600"
              />
              <span className="text-green-600 font-medium">Income</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default Form;
