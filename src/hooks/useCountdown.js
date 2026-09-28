import { useState, useEffect } from 'react';

export const useCountdown = (targetDate) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isComplete: false
      });
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
};
