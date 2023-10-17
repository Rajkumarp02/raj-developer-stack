import mongoose from'mongoose';


const otpSchema = mongoose.Schema({
    number:{type:Number,match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,},
    otp:{type:String, required:true},
    })



export default mongoose.model("Otp",otpSchema);