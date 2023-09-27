import { Platform } from "react-native";
import { globalHeight, globalWidth } from "./globalWidth";
import { isTablet, isWeb } from "./device";

export const fontSize = () => {
  return isWeb()
    ? globalHeight("2%")
    : Platform.isPad
    ? globalHeight("2%")
    : globalHeight("2%");
};

export const iconSizes = () => {
  const iconSize = isWeb()
    ? globalWidth("2%")
    : isTablet()
    ? globalWidth("5%")
    : globalWidth("6%");

  return iconSize;
};
