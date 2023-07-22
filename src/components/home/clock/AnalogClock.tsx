import React, { useEffect, useState } from "react";
import styles from "@/styles/miscellaneous/analogClock.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";
function AnalogClock() {
    const [dateObj, setDateObj] = useState(new Date());
    const [htime, setHtime] = useState(dateObj.getHours());
    const [mtime, setMtime] = useState(dateObj.getMinutes());
    const [stime, setStime] = useState(dateObj.getSeconds());
    const [hrotation, setHrotation] = useState(0);
    const [mrotation, setMrotation] = useState(0);
    const [srotation, setSrotation] = useState(0);
    const [dropStyle, setDropStyle] = useState({});
    const [clockStyle, setClockStyle] = useState({});
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.theme
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (stateData.currentTheme === "dark") {
            setDropStyle({
                "box-shadow":
                    "inset 20px 20px 20px rgba(255, 255, 255, 0.05),25px 35px 20px rgba(255, 255, 255, 0.05),25px 30px 30px rgba(255, 255, 255, 0.05),inset -20px -20px 25px rgba(0, 0, 0, 0.9)",
            });
            setClockStyle({
                filter: "invert(100%)",
            });
        } else {
            setDropStyle({
                "box-shadow":
                    "inset 20px 20px 20px rgba(0, 0, 0, 0.05),25px 35px 20px rgba(0, 0, 0, 0.05),25px 30px 30px rgba(0, 0, 0, 0.05),inset -20px -20px 25px rgba(255, 255, 255, 0.9)",
            });
            setClockStyle({
                filter: "none",
            });
        }
    }, [dispatch]);

    useEffect(() => {
        setInterval(() => {
            setDateObj(new Date());
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

    return (
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
                    <div
                        id={styles.second}
                        style={{ transform: `rotate(${srotation}deg)` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default AnalogClock;
