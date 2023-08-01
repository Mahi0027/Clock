import {
    AppBar,
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Divider,
    Box,
    Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import { initialStatesTypes } from "@/redux/features/setting/personalize/theme/themeReducer";
import { useSelector } from "react-redux";

interface Items {
    id: number;
    status: boolean;
    name: string;
    link: string;
    icon: string;
}
const items: Items[] = [
    {
        id: 0,
        status: true,
        name: "Setting",
        link: "setting",
        icon: "SettingsIcon",
    },
    {
        id: 1,
        status: true,
        name: "Privacy policy",
        link: "policy",
        icon: "PolicyIcon",
    },
    {
        id: 2,
        status: true,
        name: "Send feedback",
        link: "feedback",
        icon: "FeedbackIcon",
    },
    {
        id: 3,
        status: true,
        name: "Help",
        link: "help",
        icon: "HelpCenterIcon",
    },
];
const TopNavbar = ({ heading, menuItemsProps, homepage }) => {
    const stateData: initialStatesTypes = useSelector(
        (state: any) => state.theme
    );
    const router = useRouter();
    const [ancherEI, setAncherEI] = useState<null | HTMLElement>(null);
    const open = Boolean(ancherEI);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAncherEI(event.currentTarget);
    };
    const handleClose = () => {
        setAncherEI(null);
    };
    const [menuItems, setMenuItems] = useState(items);
    useEffect(() => {
        setMenuItems(items.filter(({ name }) => menuItemsProps.includes(name)));
    }, []);
    return (
        <>
            <Paper sx={{ height: "4em", boxShadow: 0 }}>
                <CssBaseline />
                <AppBar position="fixed" elevation={0} sx={stateData.style}>
                    <Toolbar>
                        {!homepage && (
                            <IconButton
                                size="large"
                                edge="start"
                                aria-label="back button"
                                id="back-button"
                                onClick={() => {
                                    router.replace("/");
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <Typography
                            variant="h5"
                            component={"div"}
                            sx={{ flexGrow: 1 }}
                        >
                            {heading}
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="more option"
                            id="resource-button"
                            onClick={handleClick}
                            aria-controls={open ? "resource-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="resource-menu"
                            anchorEl={ancherEI}
                            open={open}
                            MenuListProps={{
                                "aria-labelledby": "resource-button",
                            }}
                            onClick={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            {menuItems.map((item, index) => (
                                <Box key={item.id}>
                                    <MenuItem
                                        onClick={() => {
                                            router.replace(`/${item.link}`);
                                        }}
                                    >
                                        {/* <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon> */}
                                        <ListItemText>{item.name}</ListItemText>
                                    </MenuItem>
                                    {menuItems.length - 1 !== index && (
                                        <Divider />
                                    )}
                                </Box>
                            ))}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Paper>
        </>
    );
};

export default TopNavbar;
