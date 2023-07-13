import React from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

function policy() {
    return (
        <Layout>
            <TopNavbar
                heading={"Privacy Policy"}
                menuItemsProps={["Setting", "Send feedback", "Help"]}
                homepage={false}
            />
        </Layout>
    );
}

export default policy;
