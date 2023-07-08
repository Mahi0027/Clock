import React from "react";
import TopNavbar from "@/components/TopNavbar";

function help() {
    return (
        <TopNavbar
            heading={"Help"}
            menuItemsProps={["Setting", "Privacy policy", "Send feedback"]}
            homepage={false}
        />
    );
}

export default help;
