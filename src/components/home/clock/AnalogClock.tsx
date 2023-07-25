import React, { useEffect, useState } from "react";
import styles from "@/styles/miscellaneous/analogClock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";
function AnalogClock() {
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
    const [htime, setHtime] = useState(dateObj.getHours());
    const [mtime, setMtime] = useState(dateObj.getMinutes());
    const [stime, setStime] = useState(dateObj.getSeconds());
    const [hrotation, setHrotation] = useState(0);
    const [mrotation, setMrotation] = useState(0);
    const [srotation, setSrotation] = useState(0);
    const [dropStyle, setDropStyle] = useState({});
    const [clockStyle, setClockStyle] = useState({});
    useEffect(() => {
        if (stateData.theme.currentTheme === "dark") {
            setDropStyle({
                boxShadow:
                    "inset 20px 20px 20px rgba(0, 0, 0, 0.05),25px 35px 20px rgba(0, 0, 0, 0.05),25px 30px 30px rgba(0, 0, 0, 0.05),inset -20px -20px 25px rgba(0, 0, 0, 0.9)",
            });
            setClockStyle({
                background: `url(/images/clock/${stateData.analogClockTheme.currentTheme}.png) no-repeat`,
                backgroundSize: "contain",
                filter: "invert(100%)",
            });
        } else {
            setDropStyle({
                boxShadow:
                    "inset 20px 20px 20px rgba(0, 0, 0, 0.05),25px 35px 20px rgba(0, 0, 0, 0.05),25px 30px 30px rgba(0, 0, 0, 0.05),inset -20px -20px 25px rgba(255, 255, 255, 0.9)",
            });
            setClockStyle({
                background: `url(/images/clock/${stateData.analogClockTheme.currentTheme}.png) no-repeat`,
                backgroundSize: "contain",
                filter: "none",
            });
        }
    }, [dispatch]);

    useEffect(() => {
        setInterval(() => {
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
    }, []);
    useEffect(() => {
        setHtime(dateObj.getHours());
        setMtime(dateObj.getMinutes());
        setStime(dateObj.getSeconds());
    }, [dateObj]);
    useEffect(() => {
        setHrotation(30 * htime + mtime / 2);
        setMrotation(6 * mtime);
        setSrotation(6 * stime);
    }, [htime, mtime, stime]);

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

    return (
        <>
            <div id={styles.clockContainer}>
                <div id={styles.drop} style={dropStyle}>
                    <div id={styles.clock} style={clockStyle}>
                        <div
                            id={styles.hour}
                            style={{ transform: `rotate(${hrotation}deg)` }}
                        ></div>
                        <div
                            id={styles.minute}
                            style={{ transform: `rotate(${mrotation}deg)` }}
                        ></div>
                        {stateData.second.setSecond && (
                            <div
                                id={styles.second}
                                style={{ transform: `rotate(${srotation}deg)` }}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.timezone}>
                {stateData.timeZone.currentTimeZone}
            </div>
        </>
    );
}

export default AnalogClock;
