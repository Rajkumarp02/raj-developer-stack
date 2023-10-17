/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import LeftsideBar from "../../components/sidebar/LeftSidebar";
import Subscription from "./Subscription";

const SubscriptionPage = () => {
  return (
    <div class="Tag-sidebar-1">
      <LeftsideBar/>
      <div className='Tag-sidebar-3' style={{backgroundColor:"gray"}}>
      <Subscription />
      </div>
      
    
    </div>
  );
};

export default SubscriptionPage;