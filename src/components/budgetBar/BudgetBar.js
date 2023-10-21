import React, { useEffect, useState, useRef } from 'react';
import './BudgetBar.css'

const BudgetBar = ({ income, expenses }) => {
  const budgetBarWidth = 800;
  const totalRatioChangeRef = useRef(0)
  const budgetBlocksRef = useRef({});
  const budgetBlockPrevPageXRef = useRef(null);
  const [budgets, setBudgets] = useState({
    savings: 0.1,
    investment: 0.2,
    freeAmount: 1 - expenses / income - 0.3
  });

  const calculateWidth = ratio => {
    const numberOfResizers = Object.keys(budgets).length - 1;
    return (budgetBarWidth - 5 * numberOfResizers) * ratio + 'px';
  };

  const updateFreeAmount = () => {
    setBudgets(prevBudgets => {
      const newBudgets = { ...prevBudgets };
      let occupiedAmount = 0;
      for (const budget in budgets) {
        if (budget === 'freeAmount') {
          continue;
        }
        occupiedAmount += income * budgets[budget]
      }
      newBudgets.freeAmount = (income - occupiedAmount) / income
      return newBudgets
    })
  }

  const resize = (e, budgetLabel) => {
    setBudgets(prevBudgets => {
      console.log('ratioChange:', e.pageX - budgetBlockPrevPageXRef.current)
      let ratioChange = (e.pageX - budgetBlockPrevPageXRef.current) / budgetBarWidth;
      budgetBlockPrevPageXRef.current = e.pageX
      totalRatioChangeRef.current += ratioChange
      
      let updatedFreeAmount = prevBudgets.freeAmount - ratioChange;
      let updatedBudgetAmount = prevBudgets[budgetLabel] + ratioChange;

      if (ratioChange === 0) {
        return prevBudgets;
      } else if (ratioChange > 0 && updatedFreeAmount <= 0) {
        ratioChange = prevBudgets.freeAmount;
        updatedFreeAmount = 0;
        updatedBudgetAmount += ratioChange;
      } else if (ratioChange < 0 && updatedBudgetAmount <= 0) {
        ratioChange = prevBudgets[budgetLabel];
        updatedFreeAmount += ratioChange;
        updatedBudgetAmount = 0;
      }

      let newBudgets = { ...prevBudgets };
      newBudgets.freeAmount = updatedFreeAmount;
      newBudgets[budgetLabel] = updatedBudgetAmount;

      return newBudgets;
    });
  }

  const controlBudgetBlock = (e, budgetLabel) => {
    e.preventDefault();
    budgetBlockPrevPageXRef.current = e.pageX;
    const resizeFunction = (e) => resize(e, budgetLabel)
    window.addEventListener('mousemove', resizeFunction);
    window.addEventListener('mouseup', () => {
      console.log('totalRatioChangeRef:', totalRatioChangeRef.current)
      window.removeEventListener('mousemove', resizeFunction);
      budgetBlockPrevPageXRef.current = null;
    });
  }

  useEffect(() => {
    updateFreeAmount()
  }, []);

  const renderBlock = (label, color, ratio) => (
    <div className='budgetContainer'>
      <div
        id={label.toLowerCase()}
        className='budgetBlock'
        ref={budgetBlock => {
          budgetBlocksRef.current[label.toLowerCase()] = {};
          budgetBlocksRef.current[label.toLowerCase()].budgetBlock = budgetBlock;
        }}
        style={{ width: calculateWidth(ratio), background: color }}
      >
        <div className='budgetLabel' >
          <span>{label}</span>
          <span>{(ratio * 100).toFixed(1)}%</span>
          <span>{Math.round(ratio * income)}</span>
        </div>
      </div>
      <div
        className='resizer'
        ref={budgetBlock => { budgetBlocksRef.current[label.toLowerCase()].resizer = budgetBlock; }}
        onMouseDown={(e) => controlBudgetBlock(e, label.toLowerCase())}
      >
      </div>
    </div>
  );

  return (
    <div id='budgetBar'>
      <div id='expenses' className='budgetBlock' style={{ width: calculateWidth(expenses / income), background: 'red' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <span>Expenses</span>
          <span>{((expenses / income) * 100).toFixed(1)}%</span>
          <span>{expenses}</span>
        </div>
      </div>
      {renderBlock('Savings', 'blue', budgets.savings)}
      {renderBlock('Investment', 'green', budgets.investment)}
      <div id='freeAmount' className='budgetBlock' style={{ width: calculateWidth(budgets.freeAmount), background: 'purple' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <span>Free Amount</span>
          <span>{(budgets.freeAmount * 100).toFixed(1)}%</span>
          <span>{Math.round(budgets.freeAmount * income)}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetBar;