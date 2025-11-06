import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


function Charts() {
    const {state} = useContext(TransactionContext);
    const transactions = state.transactions;


    const income = transactions.filter((item) => item.type == "income").reduce((acc , curr) => acc + Number(curr.amount) , 0)
    const expense = transactions.filter((item) => item.type == "expense").reduce((acc , curr) => acc + Number(curr.amount) , 0)
    
    const data = [
        { name : "Income" , value : income},
        {name : "Expense" , value : expense}
    ]
    const COLORS = ["#22c55e", "#ef4444"]; // Green & Red

  return (
   <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-md mt-6">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-3">
        Income vs Expense Overview
      </h2>

      <PieChart width={320} height={260}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {data.map((entry , index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}

export default Charts