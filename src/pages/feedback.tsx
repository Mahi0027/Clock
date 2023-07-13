import React from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

function feedback() {
    return (
        <Layout>
            <TopNavbar
                heading={"Feedback"}
                menuItemsProps={["Setting", "Privacy policy", "Help"]}
                homepage={false}
            />
        </Layout>
    );
}

export default feedback;
