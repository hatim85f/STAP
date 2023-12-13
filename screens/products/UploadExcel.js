import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import FileUpload from "../../components/excelUpload/FileUpload";
import * as authActions from "../../store/auth/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadExcel = (props) => {
  const businessId = props.route.params.businessId;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");

          console.log(storedUserDetails);
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
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <FileUpload userId={user._id} businessId={businessId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {},
});

export const UploadExcelOptions = (navData) => {
  return {
    headerTitle: "UploadExcel",
  };
};

export default UploadExcel;
