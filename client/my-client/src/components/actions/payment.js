import * as api from "../Api/index.js";


export const paymentCheckout = (amount) => async (dispatch) => {
  try {
    const { data } = await api.paymentCheckOut(amount);
    dispatch(paymentApikey());
    return dispatch({ type: "ORDER_CHECKOUT", payload: data.order });
  } catch (error) {
    console.log(error);
  }
};
export const paymentApikey = () => async (dispatch) => {
  try {
    const {
      data: { key },
    } = await api.paymentGetKey();
    return dispatch({ type: "API_KEY", payload: key });
  } catch (error) {
    console.log(error);
  }
};