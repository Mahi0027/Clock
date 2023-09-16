import React, { memo, useEffect, useMemo, useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

const menuItems = ["Setting", "Privacy policy", "Send feedback"];

// all available props
const themeObj = {
    background: "#fff",
    fontFamily: "monospace",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#000000",
    userFontColor: "#fff",
};

const chatSteps = [
    {
        id: "greet",
        message: "Hi, Welcome to our app.",
        trigger: "ask name",
    },
    {
        id: "ask name",
        message: "Please enter your name.",
        trigger: "waitingForName",
    },
    {
        id: "waitingForName",
        user: true,
        validator: (value: string) => {
            if (value.length === 0) {
                return "Please enter your name";
            }
            return true;
        },
        trigger: "displayName",
    },
    {
        id: "displayName",
        message:
            "Hi {previousValue}, nice to meet you. What kind of help I can do for you?",
        trigger: "issuesList",
    },
    {
        id: "issuesList",
        options: [
            { value: "clock", label: "Clock", trigger: "clockIssue" },
            { value: "alarm", label: "Alarm", trigger: "alarmIssue" },
            { value: "timer", label: "Timer", trigger: "timerIssue" },
            {
                value: "stopwatch",
                label: "Stopwatch",
                trigger: "stopwatchIssue",
            },
        ],
    },
    {
        id: "clockIssue",
        message: "What kind of help do you need right now in clock?",
        trigger: "showFinalMessage",
    },
    {
        id: "alarmIssue",
        message: "What kind of help do you need right now in alarm?",
        trigger: "showFinalMessage",
    },
    {
        id: "timerIssue",
        message: "What kind of help do you need right now in timer?",
        trigger: "showFinalMessage",
    },
    {
        id: "stopwatchIssue",
        message: "What kind of help do you need right now in stopwatch?",
        trigger: "showFinalMessage",
    },
    {
        id: "completed",
        user: true,
        trigger: "showFinalMessage",
    },
    {
        id: "showFinalMessage",
        message: "Thank You",
        end: true,
    },
];
function Help() {
    /* This code snippet is using the `useSelector` hook from the `react-redux` library to access the
    `currentTheme` property from the Redux store. */
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const [theme, setTheme] = useState(themeObj);
    /* The `useEffect` hook is used to perform side effects in a functional component. In this code
    snippet, the `useEffect` hook is used to update the `theme` state based on the value of the
    `currentTheme` property from the Redux store. */
    useEffect(() => {
        if (currentTheme === "light") {
            setTheme({
                ...theme,
                background: "#fff",
                botBubbleColor: "#000",
                botFontColor: "#fff",
                userBubbleColor: "#575857",
                userFontColor: "#fff",
            });
        } else {
            setTheme({
                ...theme,
                background: "#000",
                botBubbleColor: "#fff",
                botFontColor: "#000",
                userBubbleColor: "#575857",
                userFontColor: "#fff",
            });
        }
    }, []);
    const helpComponent = useMemo(() => {
        console.log("calling help component");
        return (
            <Layout>
                <TopNavbar
                    heading={"Help"}
                    menuItemsProps={menuItems}
                    homepage={false}
                />
                <Stack sx={{ marginTop: "1%" }}>
                    <ThemeProvider theme={theme}>
                        <ChatBot
                            steps={chatSteps}
                            width="100vw"
                            height="100.5vh"
                            overflow="hidden"
                            cache={false}
                            enableMobileAutoFocus={true}
                            hideHeader={true}
                            hideSubmitButton={false}
                            hideBotAvatar={true}
                            hideUserAvatar={true}
                            enableSmoothScroll={true}
                            inputStyle={{
                                background:
                                    currentTheme === "light"
                                        ? "#fff"
                                        : "#000000",
                                color:
                                    currentTheme === "light"
                                        ? "#000000"
                                        : "#fff",
                            }}
                            style={{ overflow: "hidden" }}
                        />
                    </ThemeProvider>
                </Stack>
            </Layout>
        );
    }, [currentTheme, theme]);
    return helpComponent;
}

export default memo(Help);
