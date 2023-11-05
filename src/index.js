import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountDown from './Layout/Countdown';
import Clock from './Layout/Clock';
import Pomodoro from './Layout/Pomodoro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Clock />} />
          <Route path="countdown" element={<CountDown />} />
          <Route path="pomodoro" element={<Pomodoro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
