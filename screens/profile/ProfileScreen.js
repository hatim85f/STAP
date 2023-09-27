import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Image,
  Animated,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import HeaderText from "../../components/HeaderText";
import Card from "../../components/Card";
import Colors from "../../constants/Colors";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import { isWeb, isPhone, isTablet } from "../../constants/device";
import * as authActions from "../../store/auth/authActions";
import { ScrollView } from "react-native-gesture-handler";

const ProfileScreen = (props) => {
  const { user, profile } = useSelector((state) => state.auth);

  const codeContainerHeight = useRef(
    new Animated.Value(-globalHeight("200%"))
  ).current;

  const [mailCode, setMailCode] = useState("");

  const dispatch = useDispatch();

  // getting user back if he is logged out for any reason except he pressed logout button
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

  // seding verification code to mail
  const verifyEmail = () => {
    dispatch(authActions.verifyEmail());

    Animated.timing(codeContainerHeight, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  // verifying mail code
  const verifyMailCode = () => {
    dispatch(authActions.confirmCode(mailCode));

    dispatch(authActions.getProfile());

    Animated.timing(codeContainerHeight, {
      toValue: -globalHeight("200%"),
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  // canceling verification
  const cancelVerification = () => {
    setMailCode("");
    Animated.timing(codeContainerHeight, {
      toValue: -globalHeight("200%"),
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const verifyPhone = () => {};

  const iconSize = isWeb()
    ? globalWidth("2%")
    : isTablet()
    ? globalWidth("5%")
    : globalWidth("6%");

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled scrollEventThrottle={16}>
        {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
        <View style={styles.innerContainer}>
          <Image
            source={{ uri: profile.profilePicture }}
            style={styles.profile}
          />
          <HeaderText text={profile.userName} />
          <Text style={styles.position}>{profile.designation}</Text>
          <View style={{ height: 30 }} />
          <Card style={styles.contentRow}>
            <View style={styles.icon}>
              <MaterialIcons name="email" size={iconSize} color={Colors.font} />
              <Text style={styles.data}>{profile.email}</Text>
            </View>
            <View style={styles.verifyBox}>
              {profile.emailVerified ? (
                <Text
                  style={[
                    styles.verified,
                    { color: "green", textDecorationLine: "none" },
                  ]}
                >
                  {" "}
                  (Verified){" "}
                </Text>
              ) : (
                <TouchableOpacity onPress={verifyEmail} style={styles.smallRow}>
                  <Text style={styles.verified}> Verify Mail </Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
          <Card style={styles.contentRow}>
            <View style={styles.icon}>
              <MaterialIcons
                name="phone-android"
                size={iconSize}
                color={Colors.font}
              />
              <Text style={styles.data}>{profile.phone}</Text>
            </View>
            <View style={styles.verifyBox}>
              {profile.phoneVerified ? (
                <View style={styles.smallRow}>
                  <Text style={styles.verified}> (Verified) </Text>
                  <MaterialIcons name="done" size={iconSize} color="green" />
                </View>
              ) : (
                <TouchableOpacity onPress={verifyPhone} style={styles.smallRow}>
                  <Text style={styles.verified}> Verify Phone </Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>
          {profile.business &&
            profile.business.length > 0 &&
            profile.business.map((business, index) => {
              return (
                <View style={styles.businessContainer} key={index}>
                  <Text style={styles.number}> {index + 1} </Text>
                  <Card style={styles.cardRow}>
                    <Image
                      source={{ uri: business.businessLogo }}
                      style={styles.logo}
                    />
                    <Text style={styles.data}>{business.businessName}</Text>
                    <Text style={[styles.data, { color: Colors.font }]}>
                      {" "}
                      {business.numberOfEmployees}{" "}
                      {business.numberOfEmployees > 1 ? "Users" : "User"}{" "}
                    </Text>
                  </Card>
                </View>
              );
            })}
        </View>
        <Animated.View
          style={[
            styles.codeContainer,
            { transform: [{ translateY: codeContainerHeight }] },
          ]}
        >
          <TouchableOpacity onPress={cancelVerification}>
            <AntDesign name="closesquare" size={iconSize} color="white" />
          </TouchableOpacity>
          <Input
            label="Enter Code"
            onChangeText={(text) => setMailCode(text)}
            style={styles.input}
            labelStyle={styles.labelStyle}
            keyboardType="number-pad"
            value={mailCode}
          />
          <Button
            onPress={verifyMailCode}
            title="Verify"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </Animated.View>
        <View style={{ height: 60 }} />
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
    height: "99.5%",
    width: isWeb() ? "60%" : "100%",
    alignSelf: "center",
    // marginTop: "0.5%",
    borderRadius: 15,
    borderColor: "#6a6b6c",
    borderWidth: isWeb() ? 1 : 0,
  },
  profile: {
    height: isWeb()
      ? globalWidth("8%")
      : isTablet()
      ? globalWidth("18%")
      : globalWidth("30%"),
    width: isWeb()
      ? globalWidth("8%")
      : isTablet()
      ? globalWidth("18%")
      : globalWidth("30%"),
    borderRadius: isWeb()
      ? globalWidth("4%")
      : isTablet()
      ? globalWidth("9%")
      : globalWidth("15%"),
    alignSelf: "center",
    marginTop: 15,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    height: globalHeight("8%"),
    width: isWeb() ? "70%" : "90%",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "60%",
    paddingHorizontal: isWeb() ? 10 : 0,
  },
  data: {
    marginLeft: 5,
    fontFamily: "headers",
    color: Colors.primary,
    fontSize: isWeb()
      ? globalWidth("1.5%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("4%"),
  },
  verified: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.5%")
      : isTablet()
      ? globalWidth("3%")
      : globalWidth("4%"),
  },

  verified: {
    fontFamily: "headers",
    color: "blue",
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("2%")
      : globalWidth("3%"),
  },
  position: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1%")
      : isTablet()
      ? globalWidth("2%")
      : globalWidth("3%"),
    color: Colors.font,
  },
  businessContainer: {
    width: isWeb() ? "70%" : "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  number: {
    fontFamily: "numbers",
    fontSize: isWeb()
      ? globalWidth("2%")
      : isTablet()
      ? globalWidth("4%")
      : globalWidth("5.5%"),
  },
  logo: {
    width: isWeb()
      ? globalWidth("4%")
      : isTablet()
      ? globalWidth("9%")
      : globalWidth("10%"),
    height: isWeb()
      ? globalWidth("4%")
      : isTablet()
      ? globalWidth("9%")
      : globalWidth("10%"),
    borderRadius: isWeb()
      ? globalWidth("2%")
      : isTablet()
      ? globalWidth("4.5%")
      : globalWidth("7.5%"),
    borderColor: "navy",
    borderWidth: 2.5,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    borderWidth: 0,
    borderRadius: 8,
    height: globalHeight("10%"),
    width: "100%",
  },
  codeContainer: {
    position: "absolute",
    backgroundColor: Colors.accent,
    height: 250,
    width: isWeb() ? "60%" : "90%",
    top: globalHeight("30%"),
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "#6a6b6c",
    borderWidth: 2,
    padding: 10,
  },
  labelStyle: {
    color: "white",
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("2%")
      : Platform.isPad
      ? globalWidth("4%")
      : globalWidth("5.5%"),
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    fontFamily: "numbers",
    color: Colors.font,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    width: "40%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  buttonTitle: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("2%")
      : Platform.isPad
      ? globalWidth("4%")
      : globalWidth("5.5%"),
  },
});

export default ProfileScreen;
