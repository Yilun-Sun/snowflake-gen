import React from 'react';
// import logo from './logo.svg';
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

function getND() {
  var textElement = document.getElementById("randomText");
  textElement.value = randomNormalDistribution();
}

function randomNormalDistribution() {
  var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
  do {
    //获得两个（-1,1）的独立随机变量
    u = Math.random() * 2 - 1.0;
    v = Math.random() * 2 - 1.0;
    w = u * u + v * v;
  } while (w == 0.0 || w >= 1.0)
  //这里就是 Box-Muller转换
  c = Math.sqrt((-2 * Math.log(w)) / w);
  //返回2个标准正态分布的随机数，封装进一个数组返回
  //当然，因为这个函数运行较快，也可以扔掉一个
  //return [u*c,v*c];
  return u * c;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas id="canvas" />
      </header>
      <button onClick={getND}> random </button>
      <textarea id="randomText"></textarea>
    </div>
  );
}

export default App;
