import axios from 'axios'


const API = axios.create({baseURL:"http://localhost:5000"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });


  // Authentication Routes
export const logIn = (authdata) => API.post('/user/login',authdata)
export const signUp = (authdata) => API.post('/user/signup',authdata)


// Routes for login history
export const getLog = () => API.get('/user/loginHistory')

// Routes for question
export const question = (authdata) => API.post('/Question/AskQuestion',authdata) 
export const getQuestion = () => API.get('/Question/get');
export const deleteQuestion = (id) => API.delete(`/Question/delete/${id}`)
export const voteQuestion = (id,value,userId) => API.patch(`/Question/vote/${id}`,{value,userId})

// Routes for answers
export const postAnswer =(id,noOfAns,answerBody,userAnswer,userId) => API.patch(`/answer/post/${id}`,{noOfAns,answerBody,userAnswer,userId})
export const deleteAnswer = (id,answerId,noOfAns) =>API.patch(`/answer/delete/${id}`,{answerId,noOfAns})
// Routes for users
export const getAlluser = () => API.get('/user/getAlluser');
export const updateUser = (id,updateData) => API.patch(`/user/update/${id}`,updateData);

// Routes for Verify
export const numberSend = (mobileData) => API.post("/user/otpsend", mobileData);
export const otpVerify = (otpData) => API.post("/user/verify", otpData);



// Chatbot Routes
export const sendChatbot = (textDAta) => API.post("/chatbot/send", textDAta);

// Payment Routes
export const paymentCheckOut = (amount) => API.post("/payment/checkout", amount);
export const paymentGetKey = () => API.get("/payment/geykey");
export const subscriptionSet = (amount) => API.patch("/subscription/verify", amount);
export const subscriptionValidation = (userId) => API.patch("/subscription/validity", userId);