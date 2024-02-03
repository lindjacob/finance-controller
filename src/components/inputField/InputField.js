import React from 'react';

function InputField({name, type, value, onChange, className}) {
  return (
    <div className={className}>
      <label>
        {name}:
        <input type={type} value={value} onChange={onChange} />
      </label>
    </div>
  );
}

export default InputField;