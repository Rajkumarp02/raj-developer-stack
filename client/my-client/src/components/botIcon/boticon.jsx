import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";


const BotIcon = () => {
  const elementRef = useRef(null);
  const location = useLocation();

  
  useEffect(() => {
    if (location.pathname === "/Chatbot") {
      elementRef.current.classList.add("active");
    } else {
      elementRef.current.classList.remove("active");
    }
  }, [location]);

  return (   
    <button className="nav-btn">                                                
      <NavLink to={"/OtpAuth"} className="side-nav-links" ref={elementRef}  style={{textDecoration:"none", color: "rgba(85, 83, 83, 0.993)"
          }}>
        <div className="chatbot-icon">
          <i className="ri-chat-voice-fill"></i>
        </div>
        
       CHAT-BOT
       
      </NavLink>
    </button>
  );
};

export default BotIcon;