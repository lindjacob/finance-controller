import React, { useRef } from 'react';

function InputField({name, value, onChange}) {
  const inputRef = useRef(null);

  const focusInput = () => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`w-32 h-28 m-4 p-2 text-center border-2 border-primary rounded-lg cursor-pointer`}
      onClick={focusInput}
    >
      <div className='m-4'>
        <h3 className='h5'>{name}</h3>
        <style>
          {`
            /* For WebKit browsers */
            input[type='number']::-webkit-inner-spin-button,
            input[type='number']::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* For Firefox */
            input[type='number'] {
              -moz-appearance: textfield;
            }
          `}
        </style>
        <input 
          ref={inputRef}
          className={`max-w-12 text-lg text-center cursor-pointer focus-visible:outline-none caret-primary`} 
          type='number' 
          value={value} 
          onChange={onChange} 
        />
      </div>
    </div>
  );
}

export default InputField;