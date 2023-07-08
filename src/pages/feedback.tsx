import React from "react";
import TopNavbar from "@/components/TopNavbar";

function feedback() {
    return (
        <TopNavbar
            heading={"Feedback"}
            menuItemsProps={["Setting", "Privacy policy", "Help"]}
            homepage={false}
        />
    );
}

export default feedback;
