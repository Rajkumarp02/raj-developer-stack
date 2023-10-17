import express from 'express'
const app =  express();
import mongoose from'mongoose'
import cors from'cors'
import useRouter from './routes/user.js'
import Ask from './routes/Ask.js'
import answer from './routes/answer.js'
import paymentRoutes from "./routes/payment.js";
import subscribeRoutes from "./routes/subscripe.js";
import dotenv from 'dotenv'

app.use(
  cors({
    origin:"*",
  })
);
 
dotenv.config()
const corsOptions = {
  origin:"http://localhost:3000",
  methods:"GET,POST,DELETE,PATCH,HEAD",
  Credentials:true,
  OptionsSuccessStatus:204,
};

app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))

app.use('/user',useRouter)
app.use('/Question',Ask)
app.use('/answer',answer)
app.use("/payment", paymentRoutes);
app.use("/subscription", subscribeRoutes);

app.use(express.json());
app.use(cors(corsOptions));


 app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
}); 



const userDatabase ={};




app.get('/',  ((req,res) => {
  res.send("hi");
}))

const connect_url = process.env.MONGODB_URL
mongoose.connect(connect_url,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(5000, () => {
      console.log("success")
})).catch((err) => console.log(err.message))
