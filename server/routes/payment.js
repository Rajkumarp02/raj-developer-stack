import express from "express";
import { checkout, paymentVerification } from "../controller/payment.js";
const router = express.Router();

//import { checkout,paymentVerification } from "../controller/payment.js";
// Id created by razorpay
router.post("/checkout",checkout);
router.post("/verification", paymentVerification);

router.get("/geykey", (req, res) => {
  res.status(200).json({ key:"rzp_test_1AbFVMLdXBfy75"});
});
export default router;