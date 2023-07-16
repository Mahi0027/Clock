import React from "react";
import TopNavbar from "@/components/TopNavbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ClockSetting from "@/components/setting/clock";
import AlarmSetting from "@/components/setting/alarm";
import TimerSetting from "@/components/setting/timer";
import PersonalizeSetting from "@/components/setting/personalize";
import { Box, Paper } from "@mui/material";
import Layout from "@/components/Layout";
function setting() {
    return (
        <>
            {/* <Layout> */}
                    <TopNavbar
                        heading={"Setting"}
                        menuItemsProps={[
                            "Privacy policy",
                            "Send feedback",
                            "Help",
                        ]}
                        homepage={false}
                    />
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <PersonalizeSetting />
                        <Divider />
                        <ClockSetting />
                        <Divider />
                        <AlarmSetting />
                        <Divider />
                        <TimerSetting />
                    </List>
            {/* </Layout> */}
        </>
    );
}

export default setting;
