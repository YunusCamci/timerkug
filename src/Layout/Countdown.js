import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

import '../App.css';
import '../Styles/Clock.css';

import reklam from '../Assets/img/reklam.jpeg';

function CountDown() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && (parseInt(hour) > 0 || parseInt(minute) > 0 || parseInt(second) > 0)) {
      timer = setInterval(() => {
        let newHour = parseInt(hour);
        let newMinute = parseInt(minute);
        let newSecond = parseInt(second);

        if (newSecond > 0) {
          newSecond--;
        } else {
          if (newMinute > 0) {
            newMinute--;
            newSecond = 59;
          } else {
            if (newHour > 0) {
              newHour--;
              newMinute = 59;
              newSecond = 59;
            }
          }
        }

        setHour(String(newHour).padStart(2, "0"));
        setMinute(String(newMinute).padStart(2, "0"));
        setSecond(String(newSecond).padStart(2, "0"));

        if (newHour === 0 && newMinute === 0 && newSecond === 0) {
          setIsActive(false);
          setIsCounting(false);
          setIsModalOpen(true);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [hour, minute, second, isActive]);

  const incrementHour = () => setHour(String(parseInt(hour) + 1).padStart(2, "0"));
  const decrementHour = () => setHour(String(Math.max(0, parseInt(hour) - 1)).padStart(2, "0"));

  const incrementMinute = () => setMinute(String(parseInt(minute) + 1).padStart(2, "0"));
  const decrementMinute = () => setMinute(String(Math.max(0, parseInt(minute) - 1)).padStart(2, "0"));

  const incrementSecond = () => setSecond(String(parseInt(second) + 1).padStart(2, "0"));
  const decrementSecond = () => setSecond(String(Math.max(0, parseInt(second) - 1)).padStart(2, "0"));

  const startCountdown = () => {
    if (!isCounting) {
      if (hour === "00" && minute === "00" && second === "00") {

        toast.warn("Countdown değerlerini ayarlayın!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setIsActive(true);
        setIsCounting(true);
      }
    }
  };

  const stopCountdown = () => {
    if (isActive) {
      setIsActive(false);
      setIsCounting(false);

      if (hour !== "00" || minute !== "00" || second !== "00") {
        toast.info("Countdown durdu!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const resetCountdown = () => {
    setIsActive(false);
    setIsCounting(false);
    setHour("00");
    setMinute("00");
    setSecond("00");

    if (hour !== "00" || minute !== "00" || second !== "00") {
      toast.success("Countdown sıfırlandı!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const adTimeout = setTimeout(() => {
      setShowAd(false);
    }, 10000);

    return () => clearTimeout(adTimeout);
  }, []);

  return (

    <div>
      <Helmet>
        <title>CountDown | Timerkug</title>
      </Helmet>

      {showAd && (
        <div className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-screen" style={{ backgroundColor: 'rgb(0 0 0 / 95%)' }}>
          <div className="h-screen flex items-center justify-center" >
            <div className="relative w-full max-w-md max-h-full">
              <p>10 Saniye içinde reklam kapancak.</p>
              <img src={reklam} alt="Reklam" />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-screen" style={{ backgroundColor: 'rgb(0 0 0 / 85%)' }}>
          <div className="h-screen flex items-center	justify-center" >
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 animate__animated animate__slideInDown">
                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Kapat</span>
                </button>
                <div className="p-6 text-center">
                  <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Countdown süreniz Tamamlandı!</h3>

                  <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={closeModal}>Tamam</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      <div className="clock">
        <div className="flex flex-col items-center">
          <button type="button" style={{ fontSize: 65, color: '#b1b2ff' }} onClick={incrementHour}>+</button>
          <div className="hour">{hour}</div>
          <button type="button" style={{ fontSize: 65, color: '#b1b2ff' }} onClick={decrementHour}>-</button>
        </div>

        <div className="colon flex flex-col justify-center">:</div>

        <div className="flex flex-col items-center">
          <button type="button" style={{ fontSize: 65, color: '#ffb3b3' }} onClick={incrementMinute}>+</button>
          <div className="minute">{minute}</div>
          <button type="button" style={{ fontSize: 65, color: '#ffb3b3' }} onClick={decrementMinute}>-</button>
        </div>

        <div className="colon flex flex-col justify-center">:</div>

        <div className="flex flex-col items-center">
          <button type="button" style={{ fontSize: 65, color: '#e79243' }} onClick={incrementSecond}>+</button>
          <div className="second">{second}</div>
          <button type="button" style={{ fontSize: 65, color: '#e79243' }} onClick={decrementSecond}>-</button>
        </div>
      </div>

      {/* Button alanı */}
      <div className="flex flex-row justify-between">
        <div>
          <Link to="/" className="button" style={{ backgroundColor: "#e27f23" }}>Saat'e Dön</Link>
        </div>

        <div className="flex flex-row justify-center">
          <button className="button" style={{ backgroundColor: '#b1b2ff' }} onClick={startCountdown}>
            Başlat
          </button>
          <button className="button ml-4" style={{ backgroundColor: '#ffb3b3' }} onClick={stopCountdown}>
            Durdur
          </button>
          <button className="button ml-4" style={{ backgroundColor: '#e79243' }} onClick={resetCountdown}>
            Sıfırla
          </button>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default CountDown;
