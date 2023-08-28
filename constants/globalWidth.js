import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Export the responsive width and height functions directly
export const globalWidth = (percentage) => wp(percentage);
export const globalHeight = (percentage) => hp(percentage);
