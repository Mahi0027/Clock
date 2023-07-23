import React, { useEffect, useState } from "react";
import styles from "@/styles/miscellaneous/digitalClock.module.scss";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";
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
function DigitalClock() {
    const stateData = useSelector((state: any) => state);
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
    const [htime, setHtime] = useState(dateObj.getHours().toString());
    const [mtime, setMtime] = useState(dateObj.getMinutes().toString());
    const [stime, setStime] = useState(dateObj.getSeconds().toString());
    const [day, setDay] = useState(dateObj.getDate().toString());
    const [month, setMonth] = useState(months[dateObj.getMonth()]);
    const [year, setYear] = useState(dateObj.getFullYear().toString());
    const [session, setSession] = useState("");
    const [clockStyle, setClockStyle] = useState({});
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
        if (stateData.theme.currentTheme === "dark") {
            setClockStyle({
                color: "#fff",
            });
        } else {
            setClockStyle({
                color: "#000000",
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
        setMtime(() => {
            let currentMinute = dateObj.getMinutes().toString();
            if (Number(currentMinute) < 10) {
                return currentMinute.toString().padStart(2, "0");
            }
            return currentMinute;
        });
        setStime(() => {
            let currentSecond = dateObj.getSeconds().toString();
            if (Number(currentSecond) < 10) {
                return currentSecond.toString().padStart(2, "0");
            }
            return currentSecond;
        });
    }, [dateObj]);

    /* on minute change. */
    useEffect(() => {
        setHtime(() => {
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
    }, [mtime]);

    function calcTime() {
        const currentDate = new Date();
        const time = currentDate.toLocaleString("en-US", {
            timeZone: stateData.timeZone.currentTimeZone,
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

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    return (
        <div className={styles.container}>
            <div className={styles.clock} style={clockStyle}>
                <span className="hours">{htime}</span>
                <span>:</span>
                <span className="minutes">{mtime}</span>
                {stateData.second.setSecond && (
                    <>
                        <span>:</span>
                        <span className="seconds">{stime}</span>
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
                <span className={styles.timezone}>
                    {stateData.timeZone.currentTimeZone}
                </span>
            </div>
        </div>
    );
}

export default DigitalClock;
