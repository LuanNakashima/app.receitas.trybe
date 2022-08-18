import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import wifiIcon from './images/wi-fi.png'
import sinalIcon from './images/sinal.png'
import batteryIcon from './images/bateria-cheia.png'

ReactDOM.render(
  <BrowserRouter>
    <div className="App">
      <div className="phone">
        <div className="screen">
          <div className="top">
            <div className="dock-left">
              <span className="clock">12:00</span>
            </div>
            <div className="dock">
              <div className="sensor" />
              <div className="speaker" />
              <div className="camera" />
            </div>
            <div className="dock-right">
              <div className="signal">
                <img
                  className="icon"
                  src={ sinalIcon }
                />
              </div>
              <div className="wifi">
                <img className="icon" src={ wifiIcon } />
              </div>
              <div className="battery">
                <img
                  className="icon"
                  src={ batteryIcon }
                />
              </div>
            </div>
          </div>
          <App />
        </div>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
