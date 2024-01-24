import { useEffect, useState } from "react";

const CountDown = (props) => {
  const initDuration = 1800;
  const [duration, setDuration] = useState(initDuration);

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minnutes = Math.floor(sec_num / 60) % 60;
    const second = sec_num % 60;

    return [hours, minnutes, second]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== 0 || i > 0)
      .join(":");
  };

  useEffect(() => {
    if (duration === 0) {
      props.onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setDuration(duration - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return <div className="countdown-container">{toHHMMSS(duration)}</div>;
};

export default CountDown;
