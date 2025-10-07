import { useState, useEffect } from "react";
import "./ComingSoon.css";
import churchImage from "./assets/christtheking 2.jpg";


function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2025-11-16T13:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days < 10 ? "0" + days : days,
        hours: hours < 10 ? "0" + hours : hours,
        minutes: minutes < 10 ? "0" + minutes : minutes,
        seconds: seconds < 10 ? "0" + seconds : seconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="containercomingsoon">
      <img src={churchImage} alt="CTK" className="imagecomingsoon" />
      <header>CTK Embakasi Parish Website Coming Soon</header>
      <p>
        Our website is being constructed. We're working hard to give you a nice
        experience. Relax and stay tuned!
      </p>

      <div className="time-contentcomingsoon">
        <div className="time dayscomingsoon">
          <span className="numbercomingsoon">{timeLeft.days}</span>
          <span className="textcomingsoon">Days</span>
        </div>
        <div className="time hourscomingsoon">
          <span className="numbercomingsoon">{timeLeft.hours}</span>
          <span className="textcomingsoon">Hours</span>
        </div>
        <div className="time minutescomingsoon">
          <span className="numbercomingsoon">{timeLeft.minutes}</span>
          <span className="textcomingsoon">Minutes</span>
        </div>
        <div className="time secondscomingsoon">
          <span className="numbercomingsoon">{timeLeft.seconds}</span>
          <span className="textcomingsoon">Seconds</span>
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
