import React, { useEffect, useState, useRef } from 'react';
import './BudgetBar.css'

const BudgetBar = ({ income, expenses }) => {
  const budgetBlocksRef = useRef({});
  const initialPageX = useRef(null);
  const [budgets, setBudgets] = useState({
    savings: income * 0.1,
    investment: income * 0.2,
    freeAmount: income - expenses - income * 0.3
  });

  const setInitialPageX = e => {
    initialPageX.current = e.pageX;
  }

  useEffect(() => {
    for (const key in budgetBlocksRef.current) {
      const budgetBlock = budgetBlocksRef.current[key].budgetBlock
      const resizer = budgetBlocksRef.current[key].resizer
      
      resizer.addEventListener('mousedown', e => {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
      })
      
      const resize = e => {
        const budgetLabel = budgetBlock.id.toLowerCase()
        let amountChange = e.movementX
        
        if (budgets.freeAmount <= 0) {
          return;
        };

        setBudgets(prevBudgets => {
          let updatedFreeAmount = prevBudgets.freeAmount - amountChange;
          if (updatedFreeAmount <= 0) {
            amountChange = prevBudgets.freeAmount;
            updatedFreeAmount = 0;
          };
        
          let newBudgets = { ...prevBudgets };
          newBudgets[budgetLabel] += amountChange;
          newBudgets.freeAmount = updatedFreeAmount;
        
          return newBudgets;
        });
      }

      const stopResize = () => {
        window.removeEventListener('mousemove', resize)
        window.removeEventListener('mouseup', stopResize);
      }
    }
  }, [budgets.freeAmount]);

  const renderBlock = (label, color, amount) => (
    <div
      id={label.toLowerCase()}
      className='budgetBlock'
      ref={budgetBlock => budgetBlocksRef.current[label.toLowerCase()].budgetBlock = budgetBlock}
      style={{ width: `${(amount / income) * 100}%`, background: color }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <span>{label}</span>
        <span>{((amount / income) * 100).toFixed(2)}%</span>
        <span>{amount}</span>
      </div>
      <div
        className='resizer'
        ref={budgetBlock => {
          budgetBlocksRef.current[label.toLowerCase()] = {};
          budgetBlocksRef.current[label.toLowerCase()].resizer = budgetBlock;
        }}
        onMouseDown={setInitialPageX}
      >
      </div>
    </div>
  );

  return (
    <div id='budgetBar'>
      <div id='expenses' className='budgetBlock' style={{ width: `${(expenses / income) * 100}%`, background: 'red' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <span>Expenses</span>
          <span>{((expenses / income) * 100).toFixed(2)}%</span>
          <span>{expenses}</span>
        </div>
      </div>
      {renderBlock('Savings', 'blue', budgets.savings)}
      {renderBlock('Investment', 'green', budgets.investment)}
      <div id='freeAmount' className='budgetBlock' style={{ width: `${(budgets.freeAmount / income) * 100}%`, background: 'purple' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <span>Free Amount</span>
          <span>{((budgets.freeAmount / income) * 100).toFixed(2)}%</span>
          <span>{budgets.freeAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetBar;