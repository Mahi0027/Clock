import React, { useMemo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { setSecondFlag } from "@/redux";
import { setCurrentSecondFlagMiddleware } from "@/middleware/setting/clock/second";

function SetSeconds() {
    /* The code `const setSecond: boolean = useSelector((state: any) => state.second.setSecond)` is
    using the `useSelector` hook from the `react-redux` library to access the value of `setSecond`
    from the Redux store. It selects the `setSecond` value from the `state` object, which is of type
    `any`. The `setSecond` value is then assigned to the `setSecond` constant, which is of type
    `boolean`. */
    const setSecond: boolean = useSelector(
        (state: any) => state.second.setSecond
    );
    const dispatch = useDispatch();

    /* JSX code under useMemo for optimization and improving performance. */
    /* The `useMemo` hook is used to memoize the result of a function so that it is only recomputed
    when its dependencies change. In this case, the function is creating a JSX component that
    represents a list item button with a switch. */
    const setSecondsComponent = useMemo(() => {
        return (
            <ListItemButton
                sx={{ pl: 9 }}
                onChange={async () =>
                    (await setCurrentSecondFlagMiddleware(!setSecond))(dispatch)
                }
                disableRipple
            >
                <ListItemText
                    primary={
                        <Typography variant="body1">
                            Display time with seconds
                        </Typography>
                    }
                    secondary="Ex. HH:MM:SS"
                />
                <Switch edge="end" checked={setSecond} />
            </ListItemButton>
        );
    }, [dispatch, setSecond]);

    return <>{setSecondsComponent}</>;
}

export default SetSeconds;
