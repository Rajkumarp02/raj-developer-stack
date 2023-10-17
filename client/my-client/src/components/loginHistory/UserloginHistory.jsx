import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment'
export default function UserloginHistory() {
const User = useSelector((state) => state.reducer);
const user = useSelector((state) => state.currentuserReducer);

if(user === null){
 alert("Please User Signin the Page");
} else{
    alert(" only show login-history!! which user is login..." )
} 
  return (
    <div>
    <h1>User Login History</h1>
     <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>User-ipAddress</th>
          <th>User-Agent</th>
          <th>User-LoggedIn</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
      {User?.data?.map((ans)=> (
        <tr key={ans._id}>
        
           { 
                user.result?.email === ans.email &&(  //only(current-user) is read their ip address and useragent  details.
                     <>
                     <td>{ans.ipAdd}</td>
                     <td>{ans.userAgent}</td>
                     <td>LoggedIn-{moment(ans.loginTime).fromNow()}</td>
                       
                     </>
           )} 
        
       
        </tr>
      ))
      }
      </tbody>
    
    </table>
  </div>
  
</div>
  )
}
