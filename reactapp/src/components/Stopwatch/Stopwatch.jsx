import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [disable, setDisable] = useState(true);
  const [visible, setVisible] = useState(true);
  const removeVisible = () => {
    setVisible((prev) => !prev);
  };
  const removeDisable = () => {
    setDisable(false);
  };

  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    removeDisable();
    removeVisible();
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    removeVisible();
    setIsRunning(false);
  };

  const formattedTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="watch_container">
      <h1 className="head">React Stopwatch</h1>

      <p data-testid="time" className="timefont">
        {formattedTime()}
      </p>
      <div className="button_con">
        {visible && (
          <input type="button" value="Start" data-testid="start" onClick={handleStart}/>  
        )}

        {isRunning && (
          <input type="button" value="Pause" data-testid="pause" onClick={handlePause}/>
          
        )}

        {!isRunning && time !== 0 && (
          <input type="button" value="Resume" data-testid="resume" onClick={handleResume}/>
          
        )}
        {
          <input type="button" value="Reset" data-testid="reset" onClick={handleReset} disabled={disable}/>
          
        }
      </div>
    </div>
  );
};

export default Stopwatch;