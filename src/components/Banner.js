import React, { useEffect, useState } from 'react';

function Banner({ editing, setEditing, prevBudgets, setBudgets }) {
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (editing) {
            setAnimationClass('visible');
        } else {
            setAnimationClass('invisible');
        }
    }, [editing]);

    const handleSave = () => {
        setEditing(false)
      }
    
      const handleDiscard = () => {
        setEditing(false)
        setBudgets(prevBudgets)
      }

    return (
        <div className={`w-screen h-12 absolute t-0 ${animationClass} bg-primary flex flex-wrap justify-center content-center`}>
            <p className='text-lg text-white p-2'>You have started to plan your finances. When you are done, either save or discard your changes: </p>
            <div>
                <button className='bg-white m-2 p-1 rounded-md' onClick={handleDiscard}>Discard</button>
                <button className='bg-white m-2 p-1 rounded-md' onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default Banner;