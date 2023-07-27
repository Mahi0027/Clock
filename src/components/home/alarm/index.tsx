import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import styles from "@/styles/components/home/alarm/index.module.scss"
function AlarmHome() {
    return (
            <Fab
                className={styles.addAlarmButton}
                color="secondary"
                aria-label="add"
                onClick={() => alert("Hello mahi")}
            >
                <AddIcon />
            </Fab>
    );
}

export default AlarmHome;
