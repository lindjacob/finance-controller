import React, { useState } from 'react';
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
    <div className="flex bg-gray-50 caret-transparent select-none">

      <main className='grid grid-cols-2 grid-rows-custom-3 gap-3 auto-cols-min mx-20 mt-10 h-screen'>

        <div className='col-span-2 flex justify-between container'>
          <h1 className='h1'>Simple Finance Planner</h1>
          <div className='flex'>
            <InputField name="Income" value={income} onChange={(e) => setIncome(e.target.value)} />
            <InputField name="Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          </div>
          {/* <InputField name="Initial investment amount" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} type="number" /> */}
        </div>

        <div className='col-span-2'>
          <BudgetBar
            income={income}
            expenses={expenses}
            budgets={budgets}
            setBudgets={setBudgets}
            headline={'Income Allocation'}
            description={'Set your income allocation by adjusting the size of the individual account allocations'}
          />
        </div>

        <div className='col-span-1'>
          <Chart
            initialInvestment={initialInvestment}
            income={income}
            budgets={budgets}
            budgetType={'investment'}
            headline={'Investment Forecast'}
            description={'The graph shows you the yearly growth of your invetment account with an annual 7% increase'}
          />
        </div>

        <div className='col-span-1'>
          <Chart
            initialInvestment={initialInvestment}
            income={income}
            budgets={budgets}
            budgetType={'savings'}
            headline={'Savings Forecast'}
            description={'The graph shows you the yearly growth of your savings account'}
          />
        </div>

      </main>

      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default App;