import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GraphLab from '@consunet/graph-lab';

ReactDOM.render(<App />, document.getElementById('root'));

var graph = new GraphLab.graph('GraphLabDiv', {
  scaling: 0.4,
  yaw: -0.5,
  roll: -0.5,
  range_y: {from: -4, to: 4},
  range_z: {from: Math.PI * -2, to: Math.PI * 2, tick: Math.PI * 0.125},
  range_x: {from: Math.PI * -2, to: Math.PI * 2, tick: Math.PI * 0.125},
  x_name: 'x', z_name: 'z', y_name: 'y'
});

var offset = 0;

graph.insertFunction(function(x, z) {return window.Amplitude * Math.cos(x + offset) * Math.cos(z + offset);}, 'cos(x) \u00d7 cos(z)');
graph.insertFunction(function(x, z) {return window.Amplitude * Math.exp(x) * z / 100;}, 'exp(x) \u00d7 z');

graph.insertSwitchPanel();
graph.createParameterBlock();
graph.createParameter('Amplitude', 0, 1, 0.01, 1);

graph.animate(100, function() {offset += 0.04;});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
