import React from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

const menuItems = ["Setting", "Send feedback", "Help"];
function Policy() {
    return (
        <Layout>
            <TopNavbar
                heading={"Privacy Policy"}
                menuItemsProps={menuItems}
                homepage={false}
            />
        </Layout>
    );
}

export default Policy;
