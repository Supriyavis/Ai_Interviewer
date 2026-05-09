import { useEffect, useState } from "react";

export default function Timer({ duration, onExpire }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time === 0) {
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onExpire]);

  return (
    <div className="text-pink-400 text-lg">
      ⏱ {time}s
    </div>
  );
}