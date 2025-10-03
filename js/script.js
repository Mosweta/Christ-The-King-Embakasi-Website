// -----------------------------
// Dynamic Countdown Timer
// -----------------------------

// Set your target date and time (change as needed)
const targetDate = new Date("2025-11-16T13:00:00").getTime();

// Get DOM elements
const daysEl = document.querySelector('.days .number'),
      hoursEl = document.querySelector('.hours .number'),
      minutesEl = document.querySelector('.minutes .number'),
      secondsEl = document.querySelector('.seconds .number');

// Update countdown every second
const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        // Countdown finished
        clearInterval(timer);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update HTML
    daysEl.textContent = days < 10 ? "0" + days : days;
    hoursEl.textContent = hours < 10 ? "0" + hours : hours;
    minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
}, 1000);
