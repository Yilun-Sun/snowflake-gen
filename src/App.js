import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas/Canvas';

function regen() {

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas id="canvas" />
      </header>
      {/* <button onClick={regen}> Regenerate </button> */}
    </div>
  );
}

export default App;
