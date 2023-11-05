import '../Styles/Clock.css';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function Clock() {

  const [time, setTime] = useState({
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    seconds: new Date().getSeconds()
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setTime({
        minutes: date.getMinutes(),
        hours: date.getHours(),
        seconds: date.getSeconds()
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToTwoDigit = (number) => {
    return number.toLocaleString("tr-TR", {
      minimumIntegerDigits: 2
    });
  };


  return (
    <div>
      <Helmet>
        <title>Clock | Timerkug</title>
      </Helmet>

      <div className="clock">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div className="hour">{convertToTwoDigit(time.hours)}</div>
          <Link to="/countdown" className="button" style={{ backgroundColor: "#e27f23" }}>Countdown</Link>

        </div>
        <div className="colon">:</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div className="minute">{convertToTwoDigit(time.minutes)}</div>
          <Link to="/pomodoro" className="button" style={{ backgroundColor: "#ffb3b3" }}>Pomodoro</Link>
        </div>
      </div>
    </div>
  );
}

export default Clock;
