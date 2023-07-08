import React from "react";
import TopNavbar from "@/components/TopNavbar";

function policy() {
    return (
        <TopNavbar
            heading={"Privacy Policy"}
            menuItemsProps={["Setting", "Send feedback", "Help"]}
            homepage={false}
        />
    );
}

export default policy;
