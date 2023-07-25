import React, { useEffect, useState } from "react";
import styles from "@/styles/miscellaneous/Dialog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAnalogClockTheme, setDigitalClockTheme } from "@/redux";
import DigitalClock from "../home/clock/DigitalClock";

function CustomHorizontalScrollableDialog() {
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [allThemes, setAllThemes] = useState([]);
    const [currentClockTheme, setCurrentClockTheme] = useState("");

    useEffect(() => {
        if (stateData.clockStyle.currentStyle === "Analog") {
            //set all themes from analog themes.
            setCurrentClockTheme(stateData.analogClockTheme.currentTheme);
        } else {
            //set all themes from digital themes.
            setCurrentClockTheme(stateData.digitalClockTheme.currentTheme);
        }
    }, [dispatch]);
    
    useEffect(() => {
        if (stateData.clockStyle.currentStyle === "Analog") {
            //set all themes from analog themes.
            setAllThemes(stateData.analogClockTheme.allThemes);
        } else {
            //set all themes from digital themes.
            setAllThemes(stateData.digitalClockTheme.allThemes);
        }
    }, [stateData.clockStyle.currentStyle]);
    


    const handleOptionChange = (event: any) => {
        if (stateData.clockStyle.currentStyle === "Analog") {
            //set all themes from analog themes.
            dispatch(setAnalogClockTheme(event.target.value));
        } else {
            //set all themes from digital themes.
            dispatch(setDigitalClockTheme(event.target.value));
        }
        setCurrentClockTheme(event.target.value);
    };
    return (
        <div className={styles.flexContainer}>
            {allThemes.map((clockTheme, index) => {
                return (
                    <div
                        key={index}
                        className={
                            currentClockTheme === clockTheme
                                ? styles.selected
                                : ""
                        }
                    >
                        {stateData.clockStyle.currentStyle === "Analog" ? (
                            <label
                                style={{
                                    backgroundImage: `url(/images/clock/${clockTheme}.png)`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: "contain",
                                    filter:
                                        stateData.theme.currentTheme === "dark"
                                            ? "invert(100%)"
                                            : "",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="clock"
                                    id={clockTheme}
                                    value={clockTheme}
                                    onChange={handleOptionChange}
                                />
                            </label>
                        ) : (
                            <label>
                                <span
                                    style={{
                                        position: "absolute",
                                        fontFamily: clockTheme,
                                        fontWeight: "bold",
                                        top: "10%",
                                        fontSize: "2em",
                                    }}
                                >
                                    <div style={{ fontSize: "1.3em" }}>
                                        10:11:30
                                        <span
                                            style={{
                                                fontSize: "0.3em",
                                                marginLeft: "2%",
                                                verticalAlign: "text-top",
                                            }}
                                        >
                                            AM
                                        </span>
                                    </div>
                                    <div style={{ fontSize: "1.0em" }}>
                                        01/Jan/1999
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.5em",
                                            opacity: "0.8",
                                        }}
                                    >
                                        Timezone:
                                        {stateData.timeZone.currentTimeZone}
                                    </div>
                                </span>
                                <input
                                    type="radio"
                                    name="clock"
                                    id={clockTheme}
                                    value={clockTheme}
                                    onChange={handleOptionChange}
                                />
                            </label>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CustomHorizontalScrollableDialog;
