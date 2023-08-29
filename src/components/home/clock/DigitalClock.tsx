import React, { useEffect, useMemo, useState } from "react";
import styles from "@/styles/components/home/clock/digitalClock.module.scss";
import { useDispatch, useSelector } from "react-redux";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

type stateTypes = {
    currentTheme: string;
    digitalClockCurrentTheme: string;
    currentTimeZone: string;
    setSecond: boolean;
};

function DigitalClock() {
    const {
        currentTheme,
        digitalClockCurrentTheme,
        currentTimeZone,
        setSecond,
    }: stateTypes = useSelector((state: any) => ({
        currentTheme: state.theme.currentTheme,
        digitalClockCurrentTheme: state.digitalClockTheme.currentTheme,
        currentTimeZone: state.timeZone.currentTimeZone,
        setSecond: state.second.setSecond,
    }));
    const dispatch = useDispatch();
    const time = calcTime();
    const [dateObj, setDateObj] = useState(
        new Date(
            time.year,
            time.month,
            time.day,
            time.hour,
            time.minute,
            time.second
        )
    );
    const [hTime, setHTime] = useState<string>(dateObj.getHours().toString());
    const [mTime, setMTime] = useState<string>(dateObj.getMinutes().toString());
    const [sTime, setSTime] = useState<string>(dateObj.getSeconds().toString());
    const [day, setDay] = useState<string>(dateObj.getDate().toString());
    const [month, setMonth] = useState<string>(months[dateObj.getMonth()]);
    const [year, setYear] = useState<string>(dateObj.getFullYear().toString());
    const [session, setSession] = useState<string>("");
    const [clockStyle, setClockStyle] = useState<any>({});
    const [hydrated, setHydrated] = useState<boolean>(false);

    useEffect(() => {
        setHydrated(true);
        if (currentTheme === "dark") {
            setClockStyle({
                color: "#fff",
                fontFamily: digitalClockCurrentTheme,
            });
        } else {
            setClockStyle({
                color: "#000000",
                fontFamily: digitalClockCurrentTheme,
            });
        }
        let interval = setInterval(() => {
            const time = calcTime();
            setDateObj(
                new Date(
                    time.year,
                    time.month,
                    time.day,
                    time.hour,
                    time.minute,
                    time.second
                )
            );
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [dispatch]);

    /* when time change(every second) */
    useEffect(() => {
        setMTime(() => {
            let currentMinute = dateObj.getMinutes().toString();
            if (Number(currentMinute) < 10) {
                return currentMinute.toString().padStart(2, "0");
            }
            return currentMinute;
        });
        setSTime(() => {
            let currentSecond = dateObj.getSeconds().toString();
            if (Number(currentSecond) < 10) {
                return currentSecond.toString().padStart(2, "0");
            }
            return currentSecond;
        });
    }, [dateObj]);

    /* on minute change. */
    useEffect(() => {
        setHTime(() => {
            let currentHour = Number(dateObj.getHours().toString());
            if (currentHour > 12) {
                setSession("PM");
                currentHour = currentHour - 12;
            } else {
                setSession("AM");
            }
            if (currentHour < 10) {
                return currentHour.toString().padStart(2, "0");
            }
            return currentHour.toString();
        });
    }, [mTime]);

    /* calculate day,month,year,hour,minute,second. */
    function calcTime() {
        const currentDate = new Date();
        const time = currentDate.toLocaleString("en-US", {
            timeZone: currentTimeZone,
        });
        const splitTime = time.split(" ");
        const dateSplit = splitTime[0].replace(",", "").split("/");
        const timeSplit = splitTime[1].split(":");
        if (splitTime[2] === "PM") {
            timeSplit[0] = (12 + Number(timeSplit[0])).toString();
        }
        const data = {
            day: Number(dateSplit[1]),
            month: Number(dateSplit[0]) - 1,
            year: Number(dateSplit[2]),
            hour: Number(timeSplit[0]),
            minute: Number(timeSplit[1]),
            second: Number(timeSplit[2]),
        };
        return data;
    }

    /* JSX code under useMemo for optimization and improving performance. */
    const digitalClockComponent = useMemo(() => {
        return (
            <div className={styles.container}>
                <div className={styles.clock} style={clockStyle}>
                    <span className="hours">{hTime}</span>
                    <span>:</span>
                    <span className="minutes">{mTime}</span>
                    {setSecond && (
                        <>
                            <span>:</span>
                            <span className="seconds">{sTime}</span>
                        </>
                    )}
                    <span className={styles.session}>{session}</span>
                </div>
                <div className={styles.date} style={clockStyle}>
                    <span className="hours">{day}</span>
                    <span>/</span>
                    <span className="minutes">{month}</span>
                    <span>/</span>
                    <span className="seconds">{year}</span>
                </div>
                <div className={styles.date} style={clockStyle}>
                    <span className={styles.timezone}>{currentTimeZone}</span>
                </div>
            </div>
        );
    }, [
        clockStyle,
        hTime,
        mTime,
        sTime,
        session,
        setSecond,
        day,
        month,
        year,
        currentTimeZone,
    ]);

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return <>{digitalClockComponent}</>;
}

export default DigitalClock;
