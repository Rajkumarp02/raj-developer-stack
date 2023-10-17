import mongoose from'mongoose';


const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String , required:true},
    password:{type:String , required:true},
    tags:{type:[String] },
    about:{type:[String] },
    joinedOn:{type:Date , default:Date.now},
    number:{type:Number,match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,},
    userAgent:{type:String},
    ipAdd:{type:String},
    loginTime:{type:Date , default:Date.now},
    subscription: {
        pack_type: { type: String, default: "free" },
        pack_start_date: { type: Date, default: Date.now },
        attempts: { type: Number, default: 1 },
      },
    ansPoints:{type:Number,default:0},
    badges:{type:Number,default:0},
    qnAnswered:{type:Number,default:0},
    })



export default mongoose.model("User",userSchema);