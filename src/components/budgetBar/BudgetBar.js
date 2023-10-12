import React, { useEffect, useState } from 'react';
import './BudgetBar.css'

const BudgetBar = ({ income, fixedExpenses, variableExpenses }) => {
  const [savings, setSavings] = useState(income * 0.1);
  const [investment, setInvestment] = useState(income * 0.2);
  const [isDragging, setIsDragging] = useState(null);

  const calculateFreeAmount = () => income - (fixedExpenses + variableExpenses + savings + investment);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  },[])

  const handleMouseDown = section => {
    setIsDragging(section);
  };

  const handleMouseMove = e => {
    if (isDragging === 'savings') {
      console.log('movementX:', e.movementX)
      console.log('savings:', savings)
      setSavings(prev => prev + e.movementX);
      console.log('savings:', savings)
    } else if (isDragging === 'investment') {
      setInvestment(prev => prev + e.movementX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null)
    console.log('remove event listeners')
  };

  const renderBar = (color, amount, label) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${(amount / income) * 100}%`, background: color }}>
      <span>{label}</span>
      <span>{((amount / income) * 100).toFixed(2)}%</span>
      <span>{amount}</span>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', height: '50px', width: '50%', border: '1px solid black' }}>
        {renderBar('red', fixedExpenses, "Fixed Expenses")}
        {renderBar('yellow', variableExpenses, "Variable Expenses")}
        {renderBar('green', savings, "Savings")}
        <div
          style={{ cursor: 'ew-resize', background: '#ccc', width: '5px' }}
          onMouseDown={() => handleMouseDown('savings')}
        ></div>
        {renderBar('blue', investment, "Investment")}
        <div
          style={{ cursor: 'ew-resize', background: '#ccc', width: '5px' }}
          onMouseDown={() => handleMouseDown('investment')}
        ></div>
        {renderBar('purple', calculateFreeAmount(), "Free Amount")}
      </div>
    </div>
  );
};

export default BudgetBar;