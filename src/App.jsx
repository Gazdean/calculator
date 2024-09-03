import { useEffect, useState } from 'react';
import { evaluate, index } from 'mathjs';
import './App.css'
import Button from './components/Button'
import NumberButtons from './components/NumberButtons';
import OperatorButtons from './components/OperatorButtons';


export default function App() {
  const [calculation, setCalculation] = useState('')
  const [result, setResult] = useState(false)
  const [input, setInput] = useState('0')
  const [resetInput, setResetInput] = useState(false)

  function handleOnClick(buttonType, text) {
    const operators = ['+', '-', '*', '/']
    
    if ( buttonType === 'allClear' ) {
        setInput('0')
        setCalculation('')
        setResult(false)
    }
    // else if (result && (buttonType !== 'operator' || buttonType !== 'percent')) return
      // limit input length to below 28
    else if ( input.length >= 27 ) return
      // if decimal point is preesed first add a 0 before it
    else if ( buttonType === 'decimalPoint' && input === '0' ) setInput('0.')
      // can not have two '.' next to each other
    else if ( buttonType === 'decimalPoint' && input.slice(-1) === '.' ) return
      // can not have two '.' in a number
    else if ( buttonType === 'decimalPoint' && input.includes('.') ) return
      // can not start with an operator
    else if (input === '0' && buttonType === 'operator') return
      // operator functionality
    else if (buttonType === 'operator') {
      if (!result) {
        if (input.endsWith('.')) {
          setInput(prevInput => {
            const updatedInput = prevInput + '0'
            setCalculation(prevCalculation => `${prevCalculation}(${updatedInput})${text}`);
            setResetInput(true)
            return updatedInput
          })
        }
        else {
          setCalculation(prevCalculation => `${prevCalculation}(${input})${text}`);
          setResetInput(true)
        }
      }
      else {
          setCalculation(`(${input})${text}`);
          setResetInput(true)
          setResult(false)
      }
    }
      // equals functionality
    else if ( buttonType === 'equals' && calculation.length > 0) {
      setCalculation(prevCalculation => {
        const updatedCalculation = `${prevCalculation}(${input})`;
        const evaluation = evaluate(updatedCalculation).toString()
        setInput(evaluation)
        return ''
      })
      setResult(true)
    } 
      // plus minus functionality
    else if (buttonType === 'plusMinus' ) {
      if (result) return
      setInput(prevInput => {
        if (input[0] === '-') return prevInput.slice(1);
        if ( input === '0') return prevInput
        else return `-${prevInput}`;
      });
    }
      // percent functionality
    else if (buttonType === 'percent') {
      setInput(prevInput => {
        return evaluate(prevInput + '%')
      })
    }
    else if (buttonType !== 'equals') {
      // remove placeholder 0
      if ( input ==='0' ) setInput('')
      if (result && buttonType === 'decimalPoint') return
      if (result && buttonType === 'number') return
      if ( resetInput ) {
        if (buttonType === 'decimalPoint') setInput('0.')
        else setInput('')
        setResetInput(false)
      }
      setInput(prevInput => prevInput + text.toString());
    }
  }

  return (
    <> 
      <div id="calculator-body">
        <div id="calculator-screen">
          <div id="input">{input}</div>
          <div id="calculation">{calculation}</div>
        </div>
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
    </>
  );
}



    //   // after getting result if next button is a number set calculation to ""
    //   if ( (calculation === result && (buttonType !== 'operator' &&  buttonType !== 'percent')) ) {
    //     setInput('')
    //     setCalculation('')
    //   }
    //   // operator can not follow an operator
    //   if ( buttonType === 'operator' && operators.includes(input.slice(-1)) ) {
    //     return
    //   }
    //   // percent can not follow an operator
    //   if ( buttonType === 'percent' && operators.includes(input.slice(-1)) ) {
    //     return
    //   }
    //   // can not have two percent symbols next to each other
    //   if ( buttonType === 'percent' && input.slice(-1) === '%' ) {    
    //     return
    //   } 
    
    
    // else {
      // if at start of calculation remove the 0 so it does show on screen
      // if( input === '0' ) {
      //   if (buttonType === 'operator') return
      //   if (buttonType === 'percent') return
      //     setInput('')
          // setCalculation('')
      // }