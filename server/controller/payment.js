import Razorpay from "razorpay";
import crypto from "crypto";
//import dotenv from "dotenv";
//dotenv.config();
import { Payment } from "../models/Payment.js";

const instance = new Razorpay({
  key_id:"rzp_test_1AbFVMLdXBfy75",
  key_secret:"gtpozP4x3kyrWk5gX3T4aDNm",
});


export const checkout = async (req, res) => {
  const options = {
    amount:Number(req.body.amount*100),
    currency: "INR",
  };

  try{
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  }catch(err){
    res.status(500).json("Something Went Wrong !!");
    console.log(err)
  }
};





export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  console.log(req.body);
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256","Da135BU2fwrFedv7ja46")
      .update(body.toString())
      .digest("hex");

    // Check this is Authenticate or not
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

       res.redirect(
        `http://localhost:3000/paymentsuccess`
      ); 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Went Wrong !!");
  }
};