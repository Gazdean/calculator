import { useState } from 'react';
import { evaluate, index } from 'mathjs';
import './App.css'
import Button from './components/Button'
import NumberButtons from './components/NumberButtons';
import OperatorButtons from './components/OperatorButtons';


export default function App() {
  const [calculation, setCalculation] = useState('0')
  const [result, setResult] = useState('')

  function lastIndexOfOperator() {
    const operators = ['+', '-', '*', '/']

    const indexes = operators.map(operator => calculation.lastIndexOf(operator)
    )
    return Math.max(...indexes)
  }

  function handleOnClick(buttonType, text) {
    const operators = ['+', '-', '*', '/']

    if ( buttonType === 'allClear' ) {
        setCalculation('0');
        setResult('')
    } else if ( buttonType === 'equals' ) {
      const result = evaluate(calculation).toString()
      setResult(result)
      setCalculation(result)
    } else {
      // if at start of calculation remove the 0 so it does show on screen
      if( calculation === '0' ) {
        if (buttonType === 'operator') return
        if (buttonType === 'percent') return
          setCalculation('')
      }
      // after getting result if next button is a number set calculation to ""
      if ( (calculation === result && (buttonType !== 'operator' &&  buttonType !== 'percent')) ) {
        setCalculation("")
      }
      // operator can not follow an operator
      if ( buttonType === 'operator' && operators.includes(calculation.slice(-1)) ) {
        return
      }
      // percent can not follow an operator
      if ( buttonType === 'percent' && operators.includes(calculation.slice(-1)) ) {
        return
      }
      // can not have two . next to each other
      if (buttonType === 'decimalPoint' && calculation.slice(-1) === '.' ) {      
        return
      }
      // can not have two decimal points in a number
      if (buttonType === 'decimalPoint' && calculation.lastIndexOf('.') > lastIndexOfOperator() ) {    
        return
      }
      // can not have two percent symbols next to each other
      if (buttonType === 'percent' && calculation.slice(-1) === '%' ) {    
        return
      }
      if (buttonType === 'decimalPoint' && calculation === '0') {
        setCalculation('0.')
      }
      else {  
        setCalculation(prevCalculation => {
          const newCalculation = prevCalculation + text.toString();
          return newCalculation;
        })
      }
    }
  }

  return (
    <div id="calculator-body">
      <div id="calculator-screen">{calculation}</div>
      <div id="number-button-container">
        <NumberButtons handleOnClick={handleOnClick}/>
        <OperatorButtons handleOnClick={handleOnClick}/>
        <Button id={'equals'} text={'='} buttonType={'equals'} handleOnClick={handleOnClick}/>
        <Button id={'percent'} text={'%'} buttonType={'percent'} handleOnClick={handleOnClick}/>
        <Button id={'decimalPoint'} text={'.'} buttonType={'decimalPoint'} handleOnClick={handleOnClick}/>
        <Button id={'plusMinus'} text={'+/-'} buttonType={'plusMinus'} handleOnClick={handleOnClick}/>
        <Button id={'allClear'} text={'AC'} buttonType={'allClear'} handleOnClick={handleOnClick}/>
      </div>
    </div>
  );
}
