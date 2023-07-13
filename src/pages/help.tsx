import React from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

function help() {
    return (
        <Layout>
            <TopNavbar
                heading={"Help"}
                menuItemsProps={["Setting", "Privacy policy", "Send feedback"]}
                homepage={false}
            />
        </Layout>
    );
}

export default help;
