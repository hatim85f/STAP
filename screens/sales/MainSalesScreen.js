import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import TopBar from "./TopBar";

import * as authActions from "../../store/auth/authActions";

const MainSalesScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
        }

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TopBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {},
});

export const MainSalesScreenOptions = (navData) => {
  return {
    headerTitle: "MainSalesScreen",
  };
};

export default MainSalesScreen;
