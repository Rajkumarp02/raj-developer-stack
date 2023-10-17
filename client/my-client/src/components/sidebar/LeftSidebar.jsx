import React from 'react'
import { NavLink} from "react-router-dom"
import './Leftside.css'

import BotIcon from '../botIcon/boticon';

export default function LeftSidebar() {
  




  return (
  <div class="left-side">
      <div class="side-nav">
      <div class="first">
      <NavLink to="/" className="side-link" activeClass='active'
       style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)"
   }}
   >
         Home
       </NavLink>
       <p className="side-link" > Public</p></div>
      
       <div class="second">
       <NavLink to="/Question" className="side-link" activeClass='active' style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)"
   }}> 
        <i class="fa-solid fa-earth-americas">
      Questions
        </i>
      
       </NavLink>
       
       <NavLink to="/tags" className="side-link" activeClass='active' style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)",padding:"10px 0px"
   }}>
        Tags
       </NavLink>
       <NavLink to="/user" className="side-link" activeClass='active' style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)"
   }}>
      Users  
</NavLink>
<NavLink to="/price" className="side-link" activeClass='active' style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)",marginLeft:"12px"
   }}>
      Reward System
</NavLink>
<NavLink to="/loginHistory" className="side-link" activeClass='active' style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)"
   }}>
      login-History
</NavLink>
       <NavLink to="/Subscription" className="side-link" activeClass='active' style={{textDecoration:"none", color: "rgba(253, 241, 241, 0.993)"
            }}>
              Subscription
            </NavLink> <br/>
           <div>
          <BotIcon />
          </div>
         
       </div>
      </div>
    </div>
  )
}
