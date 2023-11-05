import React, { useState, useEffect } from 'react';
import '../Styles/Clock.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function Pomodoro() {
  const [running, setRunning] = useState(false);
  const [workMode, setWorkMode] = useState(true); // true for work, false for break
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMolaModalOpen, setIsMolaModalOpen] = useState(false);

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          // Switch between work and break modes
          if (workMode) {
            setIsModalOpen(true); // Open the modal when the work session is complete

          } else {
            setIsMolaModalOpen(true); // Open the mola modal when the break session is complete
            setWorkMode(true);
            setMinutes(25); // 25-minute work session
            setSeconds(0);
            setRunning(false); // Stop the timer after work session is complete
          }
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [running, minutes, seconds, workMode]);

  const startTimer = () => {
    setRunning(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // Start the break session
    if (workMode) {
      setIsMolaModalOpen(false);
      setWorkMode(false);
      setMinutes(5); // 5-minute break
      setSeconds(0);
      setRunning(true); // Start the timer for the break session
    }
  };

  const closeMolaModal = () => {
    setIsMolaModalOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>Pomodoro | Timerkug</title>
      </Helmet>

      {isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-screen" style={{ backgroundColor: 'rgb(0 0 0 / 85%)' }}>
          <div className="h-screen flex items-center	justify-center" >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 animate__animated animate__slideInDown">
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only" onClick={closeModal}>Kapat</span>
                </button>
                <div className="p-6 text-center">
                  <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="mb-5 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">Çalışma Süreniz Tamamlandı!</h3>
                  <p className="text-sm font-normal text-gray-300 m-5">Mola süresine geçiş yapıyorsunuz.</p>

                  <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeModal}>Tamam</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMolaModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-screen" style={{ backgroundColor: 'rgb(0 0 0 / 85%)' }}>
          <div className="h-screen flex items-center	justify-center" >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 animate__animated animate__slideInDown">
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeMolaModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only" onClick={closeMolaModal}>Kapat</span>
                </button>
                <div className="p-6 text-center">
                  <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="mb-5 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">Mola Süresi Tamamlandı!</h3>
                  <p className="text-sm font-normal text-gray-300 m-5">Çalışma süresine geçiş yapıyorsunuz.</p>

                  <button type="button" className="text-gray-500 bg-white hover.bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeMolaModal}>Tamam</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="clock">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Link to="/" className="button" style={{ backgroundColor: "#e27f23" }}>Saat'e Dön</Link>
          <div className="hour">{String(minutes).padStart(2, '0')}</div>
          <button className="button" style={{ backgroundColor: '#b1b2ff' }} onClick={startTimer}>
            Başlat
          </button>
        </div>
        <div className="colon" style={{ marginTop: 50 }}>:</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ marginBottom: 50 }}></div>
          <div className="minute">{String(seconds).padStart(2, '0')}</div>
          <button className="button" style={{ backgroundColor: '#ffb3b3' }} onClick={stopTimer}>
            Durdur
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
