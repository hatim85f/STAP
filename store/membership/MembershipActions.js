import { mainLink } from "../mainLink";

export const GET_PACKAGES = "GET_PACKAGES";

export const getPackages = () => {
  return async (dispatch) => {
    const response = await fetch(`${mainLink}/api/packages`);
    const resData = await response.json();

    dispatch({
      type: GET_PACKAGES,
      packages: resData.packages,
    });
  };
};
