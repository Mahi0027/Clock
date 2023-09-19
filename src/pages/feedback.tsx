import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";
import { Button, Stack, TextField, TextareaAutosize } from "@mui/material";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const MenuItems = ["Setting", "Privacy policy", "Help"];
function Feedback() {
    const form = useRef<HTMLFormElement | null>(null);
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const [myTheme, setMyTheme] = useState({});
    const [formData, setFormData] = useState<any>({
        user_name: "",
        user_email: "",
        message: "",
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

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();

        const service_id = "service_xxmt0zo";
        const template_id = "template_9ir6oi9";
        const public_key = "O_QUHPMMDY1B-tPJD";
        if (form.current) {
            emailjs
                .sendForm(service_id, template_id, form.current, public_key)
                .then(
                    (result: any) => {
                        setFormData({
                            user_name: "",
                            user_email: "",
                            message: "",
                        });
                    },
                    (error: any) => {
                        console.log(error.text);
                    }
                );
        }
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
                    <form ref={form} onSubmit={sendEmail}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextareaAutosize
                            name="message"
                            value={formData.message}
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
