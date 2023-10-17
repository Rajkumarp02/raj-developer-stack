const logs = (state = {data:null}, action) => {

    switch(action.type){
        case "FETCH-DATA":
           return {...state ,data:action.payload};
               default:
                return state;
    }
}

export default logs;