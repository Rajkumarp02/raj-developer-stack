const otpuser = (state =null, action) => {

    switch(action.type){
        case "OTP-USER":
            return action.payload;
            default:
                return state;
    }
}

export default otpuser;