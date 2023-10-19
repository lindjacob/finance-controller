import React, { useState, useRef, useImperativeHandle } from 'react';

const BudgetBlock = ({ label, color, income, initialPercentage }) => {
  const [amount, setAmount] = useState(income * initialPercentage);
  const budgetBlockRef = useRef(null);
  const resizerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    get budgetBlock() {
      return budgetBlockRef.current;
    },
    get resizer() {
      return resizerRef.current;
    }
  }));

  return (
    <div 
      id={label}
      className='budgetBlock'
      ref={budgetBlockRef}
      style={{ width: `${(amount / income) * 100}%`, background: color }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <span>{label}</span>
        <span>{((amount / income) * 100).toFixed(2)}%</span>
        <span>{amount}</span>
      </div>
      <div className='resizer' ref={resizerRef}></div>
    </div>
  );
}

export default BudgetBlock;