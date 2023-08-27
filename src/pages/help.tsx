import React from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

const menuItems = ["Setting", "Privacy policy", "Send feedback"];
function Help() {
    return (
        <Layout>
            <TopNavbar
                heading={"Help"}
                menuItemsProps={menuItems}
                homepage={false}
            />
        </Layout>
    );
}

export default Help;
