import React, { useEffect, useState } from "react";
import styles from "@/styles/components/home/clock/analogClock.module.scss";
import { useDispatch, useSelector } from "react-redux";

type stateTypes = {
    currentTheme: string;
    analogClockCurrentTheme: string;
    currentTimeZone: string;
    setSecond: boolean;
};
function AnalogClock() {
    const {
        currentTheme,
        analogClockCurrentTheme,
        currentTimeZone,
        setSecond,
    }: stateTypes = useSelector((state: any) => ({
        currentTheme: state.theme.currentTheme,
        analogClockCurrentTheme: state.analogClockTheme.currentTheme,
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
    const [hTime, setHTime] = useState<number>(dateObj.getHours());
    const [mTime, setMTime] = useState<number>(dateObj.getMinutes());
    const [sTime, setSTime] = useState<number>(dateObj.getSeconds());
    const [hRotation, setHRotation] = useState<number>(0);
    const [mRotation, setMRotation] = useState<number>(0);
    const [sRotation, setSRotation] = useState<number>(0);
    const [dropStyle, setDropStyle] = useState<any>({});
    const [clockStyle, setClockStyle] = useState<any>({});

    useEffect(() => {
        if (currentTheme === "dark") {
            setDropStyle({
                boxShadow:
                    "inset 20px 20px 20px rgba(0, 0, 0, 0.05),25px 35px 20px rgba(0, 0, 0, 0.05),25px 30px 30px rgba(0, 0, 0, 0.05),inset -20px -20px 25px rgba(0, 0, 0, 0.9)",
            });
            setClockStyle({
                background: `url(/images/clock/${analogClockCurrentTheme}.png) no-repeat`,
                backgroundSize: "contain",
                filter: "invert(100%)",
            });
        } else {
            setDropStyle({
                boxShadow:
                    "inset 20px 20px 20px rgba(0, 0, 0, 0.05),25px 35px 20px rgba(0, 0, 0, 0.05),25px 30px 30px rgba(0, 0, 0, 0.05),inset -20px -20px 25px rgba(255, 255, 255, 0.9)",
            });
            setClockStyle({
                background: `url(/images/clock/${analogClockCurrentTheme}.png) no-repeat`,
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
        setHTime(dateObj.getHours());
        setMTime(dateObj.getMinutes());
        setSTime(dateObj.getSeconds());
    }, [dateObj]);

    /* on hTime, mTime, sTime value change. */
    useEffect(() => {
        setHRotation(30 * hTime + mTime / 2);
        setMRotation(6 * mTime);
        setSRotation(6 * sTime);
    }, [hTime, mTime, sTime]);

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

    return (
        <>
            <div id={styles.clockContainer}>
                <div id={styles.drop} style={dropStyle}>
                    <div id={styles.clock} style={clockStyle}>
                        <div
                            id={styles.hour}
                            style={{ transform: `rotate(${hRotation}deg)` }}
                        ></div>
                        <div
                            id={styles.minute}
                            style={{ transform: `rotate(${mRotation}deg)` }}
                        ></div>
                        {setSecond && (
                            <div
                                id={styles.second}
                                style={{ transform: `rotate(${sRotation}deg)` }}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.timezone}>{currentTimeZone}</div>
        </>
    );
}

export default AnalogClock;
