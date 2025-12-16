import { useState, useEffect } from "react";

const useRemaining = (startTime, duration) => {
  const [remaining, setRemaining] = useState({
    hrs: 0,
    mins: 0,
    secs: 0,
    diff: 0,
    expired: false,
  });

  function parseWeirdDate(str) {
    const match = str.match(
      /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2}).*?(\d{1,2}):(\d{1,2}):(\d{1,2})\s*(AM|PM)?/i
    );
    if (!match) return null;

    let [, year, month, day, h, m, s, ap] = match;

    year = Number(year);
    month = Number(month) - 1;
    day = Number(day);
    h = Number(h);
    m = Number(m);
    s = Number(s);

    if (ap) {
      const isPM = ap.toUpperCase() === "PM";
      if (isPM && h < 12) h += 12;
      if (!isPM && h === 12) h = 0;
    }

    return new Date(year, month, day, h, m, s);
  }

  useEffect(() => {
    const start = parseWeirdDate(startTime);
    if (!start) return;

    const expire = new Date(start.getTime() + duration * 60 * 60 * 1000);


    const update = () => {
      const now = new Date();
      const diff = expire.getTime() - now;


      if (diff <= 0) {
        setRemaining({ expired: true, hrs: 0, mins: 0, secs: 0, diff: diff });
        return true;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setRemaining({ hrs, mins, secs, diff, expired: false });
      return false;
    };

    if (update()) return;

    const interval = setInterval(() => {
      if (update()) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  return remaining;
};

export default useRemaining;
