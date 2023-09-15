import React, { useEffect, useState } from "react";
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
function Help() {
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const [theme, setTheme] = useState(themeObj);
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
    }, [currentTheme]);
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
                        steps={[
                            {
                                id: "1",
                                message: "What is your name?",
                                trigger: "2",
                            },
                            {
                                id: "2",
                                user: true,
                                trigger: "3",
                            },
                            {
                                id: "3",
                                message:
                                    "Hi {previousValue}, nice to meet you!",
                                end: true,
                            },
                        ]}
                        width="100vw"
                        height="100.5vh"
                        overflow="hidden"
                        cache={true}
                        enableMobileAutoFocus={true}
                        hideHeader={true}
                        hideSubmitButton={false}
                        hideBotAvatar={true}
                        hideUserAvatar={true}
                        enableSmoothScroll={true}
                        inputStyle={{
                            background:
                                currentTheme === "light" ? "#fff" : "#000000",
                            color:
                                currentTheme === "light" ? "#000000" : "#fff",
                        }}
                        style={{ overflow: "hidden" }}
                    />
                </ThemeProvider>
            </Stack>
        </Layout>
    );
}

export default Help;
