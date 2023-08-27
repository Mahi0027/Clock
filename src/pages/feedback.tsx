import React from "react";
import TopNavbar from "@/components/TopNavbar";
import Layout from "@/components/Layout";

const MenuItems = ["Setting", "Privacy policy", "Help"];
function Feedback() {
    return (
        <Layout>
            <TopNavbar
                heading={"Feedback"}
                menuItemsProps={MenuItems}
                homepage={false}
            />
        </Layout>
    );
}

export default Feedback;
