import { useContext, useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import TransactionItem from "./components/TransactionItem";
import { TransactionContext } from "./context/TransactionContext";
import Charts from "./components/Charts";

function App() {

  
  const [totalBalance, setTotalBalance] = useState(0);
  const { state, dispatch } = useContext(TransactionContext);
  const transactions = state.transactions;


  useEffect(() => {
    const total = transactions.reduce((acc, obj) => {
      const amount = Number(obj.amount);
      return obj.type === "expense" ? acc - Math.abs(amount) : acc + amount;
    }, 0);
    setTotalBalance(total);
  }, [transactions]);


  useEffect(() => {
    const storedItems = localStorage.getItem("transactions");
    if (storedItems) {
      dispatch({ type: "SET", payload: JSON.parse(storedItems) });
    }
  }, []);
   // For uploading the data from Local Storage

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Balance Card */}
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Total Balance</h1>
        <div className="mt-3 bg-white shadow-lg border border-gray-200 rounded-2xl p-5">
          <h2
            className={`text-3xl font-bold ${
              totalBalance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalBalance >= 0 ? `+${totalBalance}` : totalBalance}
          </h2>
          <p>{totalBalance < 0 ? "Debt" : ""}</p>
        </div>
      </div>

      {/* Form */}
     <div className="flex gap-6 ml-8">
  <div className="w-1/2">
    <Form />
  </div>

  <div className="w-1/2">
    <Charts />
  </div>
</div>


      {/* Transaction List */}
      <div className="w-full max-w-md mt-8 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Transaction History
        </h3>

        {transactions.length > 0 ? (
          transactions.map((item) => (
            <TransactionItem key={item.id} object={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No transactions yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
