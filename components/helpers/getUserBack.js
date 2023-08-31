import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../store/auth/authActions";
import { useDispatch } from "react-redux";

export const getUserBack = async () => {
  const dispatch = useDispatch();

  const userDetails = await AsyncStorage.getItem("userDetails");

  const parsedUserDetails = JSON.parse(userDetails);

  if (parsedUserDetails) {
    dispatch(authActions.getUserIn(parsedUserDetails));
  }
};
