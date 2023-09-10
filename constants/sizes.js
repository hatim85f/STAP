import { Platform } from "react-native";
import { globalHeight, globalWidth } from "./globalWidth";

export const fontSize = () => {
  return Platform.OS === "web"
    ? globalHeight("2%")
    : Platform.isPad
    ? globalHeight("2%")
    : globalHeight("2%");
};

export const iconSizes = () => {
  const iconSize =
    Platform.OS === "web"
      ? globalWidth("2%")
      : Platform.isPad
      ? globalWidth("5%")
      : globalWidth("6%");

  return iconSize;
};
