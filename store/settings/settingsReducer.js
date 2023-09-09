import { EDIT_CURRENCY, GET_CURRENCY_LIST } from "./settingsActions";

const initialState = {
  currencyCode: "USD",
  currencySymbol: "$",
  countryFlag: "",
  currencyName: "",
  countryName: "",
  vlaueVsUSD: null,
  currencyList: [],
  locale: "en-US",
  theme: "light",
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCY_LIST:
      return {
        ...state,
        currencyList: action.currencyList,
      };
    case EDIT_CURRENCY:
      return {
        ...state,
        currencyCode: action.currencyCode,
        currencySymbol: action.currencySymbol,
        countryFlag: action.countryFlag,
        currencyName: action.currencyName,
      };
    default:
      return state;
  }
};
