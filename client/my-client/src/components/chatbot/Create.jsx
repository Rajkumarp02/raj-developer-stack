import {useState } from 'react';
//import React {useState} from 'react'
import About from './Display';
import { useSelector } from 'react-redux';
import logo from '../../assests/bot.png';
import "./style.css"

export default function Create() {
    const user = useSelector((state) => state.currentuserReducer);
    const [Switch,setSwitch] = useState(false);
     

    const checkUser =() => {
    if(user !== null) {
        alert("Hello! Kindly ask only program realted Questions...!");
       }else{
        if(user === null){
            alert('Hello! Please go and click signin/signup button!...')
        }
     }
     setSwitch(true)
   } 

 
  
  return (
    <div>
       {
        user === null ? (
          <h4>Please sigin in your account</h4>
        ):(
           <>
           <div className='cb'>
           <img src={logo} width={300} height={190} className='bot'  alt='' />
           <p>Click___Here___This___Button___</p>
           <button  onClick={() => checkUser()}>Show ChatBot</button>
           </div>
           
          
          </>

          
        )
      }
       {
      Switch? (
        <About setSwitch={setSwitch} />
      ):(
      <>
      </>
      )
       }
    </div>
  )
}
