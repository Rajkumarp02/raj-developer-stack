import * as api from "../Api/index.js";

export const sendText = (textData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_MESSAGE", payload: textData });
    const { data } = await api.sendChatbot(textData);

    return dispatch({ type: "UPDATE_BOT_MESSAGE", payload: data });
  } catch (error) {
    console.log(error);
  }
};