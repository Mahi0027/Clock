import React, { useMemo, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import SetSilent from "./SetSilent";
import SetSnooze from "./SetSnooze";
import SetVolume from "./SetVolume";
import SetWeekOn from "./SetWeekOn";

function AlarmSetting() {
    const [open, setOpen] = useState<boolean>(true);

    /* JSX code under useMemo for optimization and improving performance. */
    const alarmSettingComponent = useMemo(() => {
        return (
            <>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        <AccessAlarmIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="h6">Alarm</Typography>}
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        <SetSilent />
                        <SetSnooze />
                        <SetVolume />
                        {/* <SetWeekOn /> */}
                    </List>
                </Collapse>
            </>
        );
    }, [open]);

    return <>{alarmSettingComponent}</>;
}

export default AlarmSetting;
