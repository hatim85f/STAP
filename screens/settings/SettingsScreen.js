import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { Button, Switch } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Card from "../../components/Card";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import * as settingsActions from "../../store/settings/settingsActions";
import Colors from "../../constants/Colors";
import MainInput from "../../components/MainInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from "../../store/auth/authActions";

const SettingsScreen = (props) => {
  const { profile } = useSelector((state) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatching, setPasswordMatching] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

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

  // getting user profile
  useEffect(() => {
    dispatch(authActions.getProfile());
  }, [dispatch]);

  useEffect(() => {
    const isActivated = profile.isActivated;
    setIsActivated(isActivated);
  }, [profile]);

  useEffect(() => {
    const isBiometricEnabled = profile.biometricEnabled;
    setIsBiometricEnabled(isBiometricEnabled);
  }, [profile]);

  // saving changes
  const saveChanges = () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatching(false);
      return;
    }

    dispatch(settingsActions.updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const deactivateAccount = () => {
    dispatch(settingsActions.deactivateAccount(isActivated));
  };

  const enableBiometricsData = () => {
    dispatch(authActions.sendBiometric());
  };

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled scrollEventThrottle={16}>
        {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
        <View style={styles.innerContainer}>
          <Card style={styles.card}>
            <Text style={[styles.title, { marginBottom: 15 }]}>
              Change Password
            </Text>
            <MainInput
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              secureTextEntry
              placeholder="Enter Old Password"
            />
            <View style={{ marginTop: 10 }} />
            <MainInput
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
              placeholder="Enter New Password"
            />
            <View style={{ marginTop: 10 }} />
            <MainInput
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
              placeholder="Confirm New Password"
              error="Password Not Matching"
              showError={!passwordMatching}
            />
            <Button
              title="Save Changes"
              onPress={saveChanges}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
              disabled={
                oldPassword === "" ||
                newPassword === "" ||
                confirmPassword === ""
              }
            />
          </Card>
          <Card style={styles.card}>
            <View
              style={[
                styles.card,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Text style={styles.title}>
                {profile.isActivated ? "Deactivate" : "Activate"} Account
              </Text>
              <Switch
                value={!isActivated}
                color={Colors.primary}
                onValueChange={() => setIsActivated(!isActivated)}
              />
            </View>
            <Button
              title="Save Changes"
              onPress={deactivateAccount}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
              disabled={isActivated === profile.isActivated}
            />
          </Card>
          {Platform.OS !== "web" && (
            <Card style={[styles.card, { marginBottom: 50 }]}>
              <View
                style={[
                  styles.card,
                  { flexDirection: "row", alignItems: "center" },
                ]}
              >
                <Text style={styles.title}>
                  {profile.biometricEnabled ? "Disable" : "Enable"} BIOMETRIC
                  Login
                </Text>
                <Switch
                  value={isBiometricEnabled}
                  color={Colors.primary}
                  onValueChange={() =>
                    setIsBiometricEnabled(!isBiometricEnabled)
                  }
                />
              </View>
              <Button
                title="Save Changes"
                buttonStyle={styles.buttonStyle}
                onPress={enableBiometricsData}
                titleStyle={styles.buttonTitleStyle}
                disabled={isBiometricEnabled === profile.biometricEnabled}
              />
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    height: "92%",
    width: Platform.OS === "web" ? "60%" : "100%",
    alignSelf: "center",
    // marginTop: "0.5%",
    borderRadius: 15,
    borderColor: "#6a6b6c",
    borderWidth: Platform.OS === "web" ? 1 : 0,
  },
  card: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    padding: 15,
    borderWidth: 0,
    borderRadius: 8,
    width: Platform.OS === "web" ? "80%" : "90%",
    zIndex: -100,
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    height: globalHeight("6%"),
    width: Platform.OS === "web" ? globalWidth("15%") : globalWidth("40%"),
    alignSelf: "center",
    marginTop: globalHeight("1%"),
  },
  title: {
    fontFamily: "headers",
    fontSize: globalHeight("2.5%"),
    color: Colors.primary,
    alignSelf: "flex-start",
  },
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: globalHeight("2%"),
  },
  dropContainer: {
    width: "95%",
    marginTop: 10,
    zIndex: 100,
  },
  buttonTitleStyle: {
    fontFamily: "headers",
    fontSize: globalHeight("2%"),
    color: "white",
    textAlign: "center",
  },
});

export default SettingsScreen;
