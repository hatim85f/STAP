import { Dimensions, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// detect the device user is using
// if width is greater than 600, it's a tablet
// if width is less than 600, it's a phone
// export it and will be used as if device.isTablet() in other files

console.log(Dimensions.get("window").width);

export function isTablet() {
  const dim = Dimensions.get("screen");
  return dim.width >= 600 && dim.width < 960;
}

export function isPhone() {
  const dim = Dimensions.get("screen");
  return dim.width < 600 && dim.width > 320;
}

export function isWeb() {
  const dim = Dimensions.get("screen");
  return dim.width >= 960;
}
