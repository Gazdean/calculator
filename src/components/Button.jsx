import React, { useState } from 'react'

export default function Button({type, id, text, setShown, setNumString}) {

    function handleOnclick() {
        const operators = ['add', 'subtract', 'multiply', 'divide']
        if(type === 'number') {
            setNumString(prevNumString => {
                const newNumString = prevNumString + text.toString();
                setShown(newNumString); 
                return newNumString;
            });
        }
        if (type === 'symbol' && operators.includes(id)) {
            
        }
    }
    return (
        <button id={`_${id}`} className={type} onClick={handleOnclick}>{text}</button>
    )
}
