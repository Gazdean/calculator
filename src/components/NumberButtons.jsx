import React from 'react'
import Button from '../components/Button'

export default function NumberButtons({handleOnClick}) {
    const renderButtons = () => {
        const buttons = []
        for (let i = 9; i >= 0; i--) {
          buttons.push(<Button key={`number${i}`} id={i} text={i.toString()} buttonType={'number'} handleOnClick={handleOnClick}/>);
        }   
        return buttons;
      };
  return (
    <>
        {renderButtons()}
    </>
  )
}
