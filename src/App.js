import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Chart from './components/chart/Chart';
import BudgetBar from './components/budgetBar/BudgetBar';
import InputField from './components/inputField/InputField';

function App() {
  const [income, setIncome] = useState(3200);
  const [expenses, setExpenses] = useState(1300);
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [budgets, setBudgets] = useState({
    savings: 0.1,
    investment: 0.2,
    freeAmount: 1 - expenses / income - 0.3
  });

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      
      <main>
        <InputField name="Income" value={income} onChange={(e) => setIncome(e.target.value)} type="number" />
        <InputField name="Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} type="number" />
        <InputField name="Initial investment amount" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} type="number" />
        <BudgetBar income={income} expenses={expenses} budgets={budgets} setBudgets={setBudgets} />
        <Chart initialInvestment={initialInvestment} budgets={budgets} income={income} />
      </main>
      
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default App;