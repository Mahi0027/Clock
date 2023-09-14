import React, { useEffect, useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";
import { Button, Stack, TextField, TextareaAutosize } from "@mui/material";
import { useSelector } from "react-redux";
import SendMail from "@/components/miscellaneous/SendMail";

const MenuItems = ["Setting", "Privacy policy", "Help"];
function Feedback() {
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const [myTheme, setMyTheme] = useState({});
    const [sendMailFlag, SetSendMailFlag] = useState(false);
    const [formData, setFormData] = useState<any>({
        sender: "",
        subject: "",
        feedback: "",
    });

    useEffect(() => {
        if (currentTheme === "light") {
            setMyTheme({
                backgroundColor: "#fff",
            });
        } else {
            setMyTheme({
                backgroundColor: "#000000",
            });
        }
    }, [currentTheme]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // SetSendMailFlag(true);
        // Do something with the form data, e.g., submit it to a server
        console.log(formData);
    };

    return (
        <Layout>
            <TopNavbar
                heading={"Feedback"}
                menuItemsProps={MenuItems}
                homepage={false}
            />
            <Stack sx={myTheme}>
                <div style={{ margin: "10% 5% 0 5%" }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="sender"
                            type="email"
                            value={formData.sender}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Subject"
                            variant="outlined"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextareaAutosize
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                            minRows={20}
                            placeholder="Write your Feedback..."
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                marginBottom: "20px",
                                paddingTop: "10px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "5px",
                                borderWidth: "1px",
                                borderColor: "#ccc",
                                background:
                                    currentTheme === "light"
                                        ? "#fff"
                                        : "#000000",
                                color:
                                    currentTheme === "light"
                                        ? "#000000"
                                        : "#fff",
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                        >
                            Send Your Feedback
                        </Button>
                    </form>
                </div>
            </Stack>
        </Layout>
    );
}

export default Feedback;
