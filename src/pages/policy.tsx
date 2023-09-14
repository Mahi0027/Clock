import React, { useEffect, useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Divider, List, ListItem, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "@/styles/policy.module.scss";

const menuItems = ["Setting", "Send feedback", "Help"];

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Policy() {
    const { currentTheme }: { currentTheme: string } = useSelector(
        (state: any) => ({
            currentTheme: state.theme.currentTheme,
        })
    );
    const [expanded, setExpanded] = useState<string | false>("panel1");
    const [myTheme, setMyTheme] = useState({});

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

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
    return (
        <Layout>
            <TopNavbar
                heading={"Privacy Policy"}
                menuItemsProps={menuItems}
                homepage={false}
            />
            <Stack>
                <div style={myTheme}>
                    <Box className={styles.headingTexts}>
                        <Typography variant="h6" className={styles.paragraph}>
                            When you use our services, you’re trusting us with
                            your information. We understand this is a big
                            responsibility and work hard to protect your
                            information and put you in control.
                        </Typography>
                        <Typography
                            variant="body2"
                            className={styles.paragraph}
                        >
                            This Privacy Policy is meant to help you understand
                            what information we collect, why we collect it, and
                            how you can update, manage, export, and delete your
                            information.
                        </Typography>
                    </Box>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                    >
                        <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            sx={myTheme}
                        >
                            <Typography variant="h5">Introduction</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We build a range of services that help millions
                                of people daily to explore and interact with the
                                world in new ways. Our services include:
                            </Typography>
                            <List>
                                <ListItem>
                                    Google apps, sites, and devices, like
                                    Search, YouTube, and Google Home
                                </ListItem>
                                <ListItem>
                                    Platforms like the Chrome browser and
                                    Android operating system
                                </ListItem>
                                <ListItem>
                                    Products that are integrated into
                                    third-party apps and sites, like ads,
                                    analytics, and embedded Google Maps
                                </ListItem>
                            </List>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                You can use our services in a variety of ways to
                                manage your privacy. For example, you can sign
                                up for a Google Account if you want to create
                                and manage content like emails and photos, or
                                see more relevant search results. And you can
                                use many Google services when you’re signed out
                                or without creating an account at all, like
                                searching on Google or watching YouTube videos.
                                You can also choose to browse the web in a
                                private mode, like Chrome Incognito mode. And
                                across our services, you can adjust your privacy
                                settings to control what we collect and how your
                                information is used.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                    >
                        <AccordionSummary
                            aria-controls="panel2d-content"
                            id="panel2d-header"
                            sx={myTheme}
                        >
                            <Typography variant="h5">
                                Information Google Collects
                            </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We collect information to provide better
                                services to all our users — from figuring out
                                basic stuff like which language you speak, to
                                more complex things like which ads you’ll find
                                most useful, the people who matter most to you
                                online, or which YouTube videos you might like.
                                The information Google collects, and how that
                                information is used, depends on how you use our
                                services and how you manage your privacy
                                controls.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                When you’re not signed in to a Google Account,
                                we store the information we collect with unique
                                identifiers tied to the browser, application, or
                                device you’re using. This allows us to do things
                                like maintain your preferences across browsing
                                sessions, such as your preferred language or
                                whether to show you more relevant search results
                                or ads based on your activity.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                When you’re signed in, we also collect
                                information that we store with your Google
                                Account, which we treat as personal information.
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Things you create or provide to us
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                When you create a Google Account, you provide us
                                with personal information that includes your
                                name and a password. You can also choose to add
                                a phone number or payment information to your
                                account. Even if you aren’t signed in to a
                                Google Account, you might choose to provide us
                                with information — like an email address to
                                communicate with Google or receive updates about
                                our services.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We also collect the content you create, upload,
                                or receive from others when using our services.
                                This includes things like email you write and
                                receive, photos and videos you save, docs and
                                spreadsheets you create, and comments you make
                                on YouTube videos.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                    >
                        <AccordionSummary
                            aria-controls="panel3d-content"
                            id="panel3d-header"
                            sx={myTheme}
                        >
                            <Typography variant="h5">
                                Why Google Data
                            </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use the information we collect from all our
                                services for the following purposes:
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Provide our services
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use your information to deliver our services,
                                like processing the terms you search for in
                                order to return results or helping you share
                                content by suggesting recipients from your
                                contacts.
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Maintain & improve our services
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We also use your information to ensure our
                                services are working as intended, such as
                                tracking outages or troubleshooting issues that
                                you report to us. And we use your information to
                                make improvements to our services — for example,
                                understanding which search terms are most
                                frequently misspelled helps us improve
                                spell-check features used across our services.
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Develop new services
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use the information we collect in existing
                                services to help us develop new ones. For
                                example, understanding how people organized
                                their photos in Picasa, Google’s first photos
                                app, helped us design and launch Google Photos.
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Provide personalized services, including content
                                and ads
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use the information we collect to customize
                                our services for you, including providing
                                recommendations, personalized content, and
                                customized search results. For example, Security
                                Checkup provides security tips adapted to how
                                you use Google products. And Google Play uses
                                information like apps you’ve already installed
                                and videos you’ve watched on YouTube to suggest
                                new apps you might like.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                Depending on your settings, we may also show you
                                personalized ads based on your interests. For
                                example, if you search for “mountain bikes,” you
                                may see ads for sports equipment on YouTube. You
                                can control what information we use to show you
                                ads by visiting your ad settings in My Ad
                                Center.
                            </Typography>
                            <List>
                                <ListItem>
                                    We don’t show you personalized ads based on
                                    sensitive categories, such as race,
                                    religion, sexual orientation, or health.
                                </ListItem>
                                <ListItem>
                                    We don’t show you personalized ads based on
                                    your content from Drive, Gmail, or Photos.
                                </ListItem>
                                <ListItem>
                                    We don’t share information that personally
                                    identifies you with advertisers, such as
                                    your name or email, unless you ask us to.
                                    For example, if you see an ad for a nearby
                                    flower shop and select the “tap to call”
                                    button, we’ll connect your call and may
                                    share your phone number with the flower
                                    shop.
                                </ListItem>
                            </List>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Measure performance
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use data for analytics and measurement to
                                understand how our services are used. For
                                example, we analyze data about your visits to
                                our sites to do things like optimize product
                                design. And we also use data about the ads you
                                interact with to help advertisers understand the
                                performance of their ad campaigns. We use a
                                variety of tools to do this, including Google
                                Analytics. When you visit sites or use apps that
                                use Google Analytics, a Google Analytics
                                customer may choose to enable Google to link
                                information about your activity from that site
                                or app with activity from other sites or apps
                                that use our ad services.
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Communicate with you
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use information we collect, like your email
                                address, to interact with you directly. For
                                example, we may send you a notification if we
                                detect suspicious activity, like an attempt to
                                sign in to your Google Account from an unusual
                                location. Or we may let you know about upcoming
                                changes or improvements to our services. And if
                                you contact Google, we’ll keep a record of your
                                request in order to help solve any issues you
                                might be facing.
                            </Typography>
                            <Typography
                                variant="body1"
                                className={styles.paragraph}
                            >
                                Protect Google, our users, and the public
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use information to help improve the safety
                                and reliability of our services. This includes
                                detecting, preventing, and responding to fraud,
                                abuse, security risks, and technical issues that
                                could harm Google, our users, or the public.
                            </Typography>
                            <Divider />
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We use different technologies to process your
                                information for these purposes. We use automated
                                systems that analyze your content to provide you
                                with things like customized search results,
                                personalized ads, or other features tailored to
                                how you use our services. And we analyze your
                                content to help us detect abuse such as spam,
                                malware, and illegal content. We also use
                                algorithms to recognize patterns in data. For
                                example, Google Translate helps people
                                communicate across languages by detecting common
                                language patterns in phrases you ask it to
                                translate.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We may combine the information we collect among
                                our services and across your devices for the
                                purposes described above. For example, if you
                                watch videos of guitar players on YouTube, you
                                might see an ad for guitar lessons on a site
                                that uses our ad products. Depending on your
                                account settings, your activity on other sites
                                and apps may be associated with your personal
                                information in order to improve Google’s
                                services and the ads delivered by Google.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                If other users already have your email address
                                or other information that identifies you, we may
                                show them your publicly visible Google Account
                                information, such as your name and photo. This
                                helps people identify an email coming from you,
                                for example.
                            </Typography>
                            <Typography
                                variant="body2"
                                className={styles.paragraph}
                            >
                                We’ll ask for your consent before using your
                                information for a purpose that isn’t covered in
                                this Privacy Policy.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Stack>
        </Layout>
    );
}

export default Policy;
