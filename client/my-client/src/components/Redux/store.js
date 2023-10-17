import { combineReducers } from "redux"
import reducer from "./reducer.js"
import  currentuserReducer  from "./currentuser.js"
import question from "./question.js"
import getAlluser from "./user"
import verifyReducer from "./verify.js";
import chatbotReducer from "./chatBot.js";
import paymentReducer from "./payment.js";
import apikeyReducer from './apiKeys.js';
import subscriptionReducer from "./subscription.js";


export default combineReducers(
    {
       reducer,currentuserReducer,question,getAlluser,verifyReducer,
       chatbotReducer,
       paymentReducer,
       apikeyReducer,
       subscriptionReducer,
    }
)