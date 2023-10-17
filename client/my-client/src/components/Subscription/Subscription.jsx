/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// My Components
import FreePack from "./Freeplan";
import SilverPack from "./Silver";
import GoldPack from "./Goldplan";
import { paymentCheckout } from "../actions/payment.js"

// Styles
import "./style.css";
const Subscription = () => {
  let User = useSelector((state) => state.currentuserReducer);
  const apiKey = useSelector((state) => state.apikeyReducer);
  const {data}  = useSelector((state) => state.paymentReducer);


  const dispatch = useDispatch();
  console.log(data)
  console.log(apiKey)
  const checkoutHandler = (amount) => {
if (User) {
      dispatch(paymentCheckout({ amount }));
      console.log(amount)
      const options = {
        key: apiKey?.key,
        amount: data?.amount,
        currency: "INR",
        name: "Raja",
        description: "StackOverflow Subscription",
        image:
        "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        order_id: data?.id,
        callback_url: "http://localhost:8000/payment/verification",
        prefill: {
          name: User?.name,
          email: User?.email,
          contact: "9992349999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F57105",
        },
      };

      if(apiKey?.key && data?.amount){
      const razor = new window.Razorpay(options);
      razor.open();
      }else{
        alert("Wait Data is loading")
      }
      localStorage.setItem("Payment", JSON.stringify({ amount: data?.amount }));
    } else {
      alert("Login Required!");
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <h1>StackOverflow Question Pack</h1>
        <h4>Pick The Best plan for you to get started with your learning journey</h4>
      </div>
      <div className="Pack_container">
        <FreePack />

        <SilverPack checkoutHandler ={checkoutHandler}/> 
        
        <GoldPack checkoutHandler = {checkoutHandler} />
      </div>
    </div>
  );
};

export default Subscription;