import React, { useEffect, useState, useRef } from 'react';
import './BudgetBar.css'

const BudgetBar = ({ income, expenses, budgets, setBudgets }) => {
  const budgetBarWidth = 800;
  const budgetBlocksRef = useRef({});
  const budgetBlockPrevPageXRef = useRef(null);

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
        occupiedAmount += prevBudgets[budget]
      }
      newBudgets.freeAmount = 1 - occupiedAmount - (expenses / income)
      return newBudgets
    })
  }

  const resize = (e, budgetLabel) => {
    let ratioChange = (e.pageX - budgetBlockPrevPageXRef.current) / budgetBarWidth;
    budgetBlockPrevPageXRef.current = e.pageX

    setBudgets(prevBudgets => {
      let updatedFreeAmount = prevBudgets.freeAmount - ratioChange;
      let updatedBudgetAmount = prevBudgets[budgetLabel] + ratioChange;
      const insufficientAmount = (ratioChange > 0 && prevBudgets.freeAmount === 0) || (ratioChange < 0 && prevBudgets[budgetLabel] === 0)

      if (ratioChange === 0 || insufficientAmount) {
        return prevBudgets;
      } else if (ratioChange > 0 && updatedFreeAmount <= 0) {
        ratioChange = prevBudgets.freeAmount;
        updatedFreeAmount = 0;
        updatedBudgetAmount = prevBudgets[budgetLabel] + ratioChange;
      } else if (ratioChange < 0 && updatedBudgetAmount <= 0) {
        ratioChange = prevBudgets[budgetLabel];
        updatedFreeAmount = prevBudgets.freeAmount + ratioChange;
        updatedBudgetAmount = 0;
      }

      let newBudgets = { ...prevBudgets };
      newBudgets.freeAmount = updatedFreeAmount;
      newBudgets[budgetLabel] = updatedBudgetAmount;
      return newBudgets;
    });
  }

  const controlBudgetBlock = (e, budgetLabel) => {
    budgetBlockPrevPageXRef.current = e.pageX;
    const resizeFunction = (e) => resize(e, budgetLabel)
    window.addEventListener('mousemove', resizeFunction);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', resizeFunction);
      budgetBlockPrevPageXRef.current = null;
    });
  }

  useEffect(() => {
    updateFreeAmount()
  }, [income, expenses]);

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