import React from 'react'
import Button from './Button';

export default function OperatorButtons({handleOnClick}) {

    const renderButtons = () => {
        const buttons = []
        const symbols = {
          add: '+', 
          subtract: '-',
          multiply: '*',
          divide: '/', 
         }
        let count = 0
        for(const symbol in symbols) {
          const text = symbols[symbol]
          count ++
          buttons.push(<Button key={`operator${count}`} id={symbol} text={text} buttonType={'operator'} handleOnClick={handleOnClick}/>)
        }
    
        return buttons;
      };
  return (
    <>
        {renderButtons()}
    </>
  )
}
