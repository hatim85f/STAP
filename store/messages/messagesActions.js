export const SYSTEM_MESSAGE = "SYSTEM_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const clearMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  };
};
