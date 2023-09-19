import React, { useEffect, useState } from "react";
import styles from "@/styles/miscellaneous/dialog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import DigitalClock from "../home/clock/DigitalClock";
import { setCurrentAnalogClockTheme } from "@/middleware/setting/clock/clockTheme/analog";
import { setCurrentDigitalClockTheme } from "@/middleware/setting/clock/clockTheme/digital";

export interface ConfirmationDialogRawProps {
    onComplete: () => void;
}
function CustomHorizontalScrollableDialog({
    onComplete,
}: ConfirmationDialogRawProps) {
    /* The code snippet is defining and initializing several variables using React hooks. */
    const stateData = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [allThemes, setAllThemes] = useState([]);
    const [currentClockTheme, setCurrentClockTheme] = useState("");

    /* The `useEffect` hook in the provided code is used to update the `currentClockTheme` state
    variable whenever the `dispatch` function or any of its dependencies change. */
    useEffect(() => {
        if (stateData.clockStyle.currentStyle === "Analog") {
            //set all themes from analog themes.
            setCurrentClockTheme(stateData.analogClockTheme.currentTheme);
        } else {
            //set all themes from digital themes.
            setCurrentClockTheme(stateData.digitalClockTheme.currentTheme);
        }
    }, [dispatch]);

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the effect is triggered whenever the value of `stateData.clockStyle.currentStyle` changes. */
    useEffect(() => {
        if (stateData.clockStyle.currentStyle === "Analog") {
            //set all themes from analog themes.
            setAllThemes(stateData.analogClockTheme.allThemes);
        } else {
            //set all themes from digital themes.
            setAllThemes(stateData.digitalClockTheme.allThemes);
        }
    }, [stateData.clockStyle.currentStyle]);

    /**
     * The function handles the option change event and sets the current clock theme based on the
     * selected value.
     * @param {any} event - The `event` parameter is an object that represents the event that triggered
     * the function. It contains information about the event, such as the target element and the value
     * of the selected option.
     */
    const handleOptionChange = async (event: any) => {
        if (stateData.clockStyle.currentStyle === "Analog") {
            //set all themes from analog themes.
            (await setCurrentAnalogClockTheme(event.target.value))(dispatch);
        } else {
            //set all themes from digital themes.
            (await setCurrentDigitalClockTheme(event.target.value))(dispatch);
        }
        setCurrentClockTheme(event.target.value);
        onComplete();
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
                                    backgroundRepeat: "no-repeat",
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
                                        top: "30%",
                                        fontSize: "2em",
                                    }}
                                >
                                    <div style={{ fontSize: "1em" }}>
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
                                    <div style={{ fontSize: "0.7em" }}>
                                        01/Jan/1999
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.3em",
                                            opacity: "0.8",
                                        }}
                                    >
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
