import { mainLink } from "../mainLink";

export const GET_INVENTORY = "GET_INVENTORY";

export const getInventory = (startMonth, endMonth, year) => {
  return async (dispatch, getState) => {
    const { user, token } = getState().auth;

    const response = await fetch(
      `${mainLink}/api/inventory/${user._id}/${startMonth}/${endMonth}/${year}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: GET_INVENTORY,
      inventory: resData.inventory,
    });
  };
};
