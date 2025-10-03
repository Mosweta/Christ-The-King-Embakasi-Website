const seconds = document.querySelector('.seconds .number'),
      minutes = document.querySelector('.minutes .number'),
      hours   = document.querySelector('.hours .number'),
      days    = document.querySelector('.days .number');

let secValue = 30,
    minValue = 59,
    hourValue = 23,
    dayValue = 57;

const timer = setInterval(() => {
    secValue--;
    if (secValue === 0) {
        secValue = 60;
        minValue--;
    }
    if (minValue === 0) {
        minValue = 60;
        hourValue--;
    }
    if (hourValue === 0) {
        hourValue = 24;
        dayValue--;
    }
    if (dayValue === 0) {
        clearInterval(timer);
    }

    // ✅ Only update numbers, leave labels alone
    seconds.textContent = secValue < 10 ? '0' + secValue : secValue; 
    minutes.textContent = minValue < 10 ? '0' + minValue : minValue;
    hours.textContent   = hourValue < 10 ? '0' + hourValue : hourValue;
    days.textContent    = dayValue < 10 ? '0' + dayValue : dayValue;
}, 1000);
