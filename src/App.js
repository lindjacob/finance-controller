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

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      
      <main>
        <InputField name="Income" value={income} onChange={(e) => setIncome(e.target.value)} type="number" />
        <InputField name="Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} type="number" />
        <InputField name="Initial investment amount" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} type="number" />
        <BudgetBar income={income} expenses={expenses} />
        <Chart initialInvestment={initialInvestment}/>
      </main>
      
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default App;