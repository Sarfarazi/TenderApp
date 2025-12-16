import { useEffect } from "react";
import useRemaining from "../../hooks/useRemaining";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const ShipmentTimer = ({ startTime, duration, setIsExpired }) => {
  const remaining = useRemaining(startTime, duration);

  useEffect(() => {
    setIsExpired({ state: remaining.expired, time: remaining.diff })
  }, [remaining.expired])



  return (
    <div className="flex items-center justify-center w-full text-red-500 text-lg" dir="ltr">

      {remaining.diff > 0 ?
        <FlipClockCountdown
          to={new Date().getTime() + (remaining.hrs * 60 * 60 + remaining.mins * 60 + remaining.secs) * 1000}
          showLabels={false}
          daysInHours={true}
          renderMap={[false, true, true, true]}
          digitBlockStyle={{ width: 30, height: 40, fontSize: 30 }}
          dividerStyle={{ color: 'white', height: 0 }}
          separatorStyle={{ color: 'black', size: '6px' }}
          duration={0.5}
        />
        :
        <p className="text-xl">مهلت ثبت درخواست پایان یافت</p>
      }
    </div>

  )
}

export default ShipmentTimer
