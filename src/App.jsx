import { useState } from 'react';
import './App.css'
import Button from './components/Button'


export default function App() {
  const [shown, setShown] = useState(0)
  const [calculation, setCalculation] = useState(0)
  const [numString, setNumString] = useState('')

  const renderButtons = () => {
    const buttons = []
    const symbols = {
      add: '➕', 
      subtract: '➖',
      multiply: '✖️',
      divide: '➗', 
      percent: '％', 
      equals: '🟰', 
      decimalPoint: '.',
      allClear: 'AC',
      plusMinus: '+/-'
     }

    let count = 0
    for(const symbol in symbols) {
      const text = symbols[symbol]
      count ++
      buttons.push(<Button key={`symbol${count}`} id={symbol} text={text} type={'symbol'} setShown={setShown} setNumString={setNumString}/>)
    }

    for (let i = 9; i >= 0; i--) {
      buttons.push(<Button key={`number${i}`} id={i} text={i} type={'number'} setShown={setShown} setNumString={setNumString}/>);
    }

    return buttons;
  };

  return (
    <div id="calculator-body">
      <div id="calculator-screen">{shown}</div>
      <div id="number-button-container">
        {renderButtons()}
      </div>
    </div>
  );
}
