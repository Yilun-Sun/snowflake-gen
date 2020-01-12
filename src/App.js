import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas/Canvas';

function randomNum() {
  const min = -30;
  const max = 30;
  let rand = min + Math.random() * (max - min);
  rand = Math.round(rand);
  var textElement = document.getElementById("randomText");
  textElement.value = rand;
  // return rand;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas />
      </header>
      <button onClick={randomNum}> random </button>
      <textarea id="randomText"></textarea>
    </div>
  );
}

export default App;
