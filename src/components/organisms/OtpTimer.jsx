
import { useEffect, useState } from "react";

const OtpTimer = ({
    initialSeconds = 120,
    onExpire,
    onResend,
}) => {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(true);


    useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsActive(false);
                    if (onExpire) onExpire();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive]);


    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    const handleResend = () => {
        setTimeLeft(initialSeconds);
        setIsActive(true);
        if (onResend) onResend();
    };

    return (
        <div className="text-blue-500">
            {isActive && timeLeft > 0 ? (
                <p>{formatTime(timeLeft)}</p>
            ) : (
                <p
                    onClick={handleResend}
                    className="text-blue-500"
                    type="button"
                >
                    ارسال مجدد کد
                </p>
            )}
        </div>
    );
};

export default OtpTimer;
