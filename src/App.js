import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Chart from './components/chart/Chart';
import BudgetBar from './components/budgetBar/BudgetBar';
import InputField from './components/inputField/InputField';

function App() {
  const [income, setIncome] = useState(3200);
  const [fixedExpenses, setFixedExpenses] = useState(800);
  const [variableExpenses, setVariableExpenses] = useState(500);
  const [initialInvestment, setInitialInvestment] = useState(1000);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      
      <main>
        <InputField name="Income" value={income} onChange={(e) => setIncome(e.target.value)} type="number" />
        <InputField name="Fixed expenses" value={fixedExpenses} onChange={(e) => setFixedExpenses(e.target.value)} type="number" />
        <InputField name="Variable expenses" value={variableExpenses} onChange={(e) => setVariableExpenses(e.target.value)} type="number" />
        <InputField name="Initial investment amount" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} type="number" />
        <BudgetBar income={income} fixedExpenses={fixedExpenses} variableExpenses={variableExpenses} />
        <Chart initialInvestment={initialInvestment}/>
      </main>
      
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default App;