import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Easing,
  Image,
  Animated,
  LayoutAnimation,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import { isWeb, isPhone, isTablet } from "../../constants/device";
import Card from "../../components/Card";
import SubscriptionDetails from "../../components/subscription/SubscriptionDetails";
import HeaderText from "../../components/HeaderText";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Chevron from "../../components/Chevron";
import ContactInformation from "../../components/profile/ContactInformation";
import UserBusinesses from "../../components/profile/UserBusinesses";
import UserPayments from "../../components/profile/UserPayments";
import UserPackage from "../../components/profile/UserPackage";

import * as authActions from "../../store/auth/authActions";
import { TouchableOpacity } from "react-native";
import { iconSizes } from "../../constants/sizes";
import AnimatedChevron from "../../components/AnimatedChevron";
import uploadImageFn from "../../components/helpers/uploadImageFn";
import WebAlert from "../../components/webAlert/WebAlert";
import Loader from "../../components/Loader";

const ProfileScreen = (props) => {
  const { profile, payments, user } = useSelector((state) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [itemOpen, setItemOpen] = useState(-1);
  const [profileURL, setProfileURL] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const isFocused = useIsFocused();

  // getting user profile
  useEffect(() => {
    if (isFocused) dispatch(authActions.getProfile());
  }, [dispatch, isFocused]);

  // sending verification code to mail
  const verifyEmail = () => {
    dispatch(authActions.verifyEmail());

    Animated.timing(codeContainerHeight, {
      toValue: 0,
      duration: 1500,
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
      easing: Easing.linear,
    }).start();
  };

  // canceling verification
  const cancelVerification = () => {
    setMailCode("");
    Animated.timing(codeContainerHeight, {
      toValue: -globalHeight("200%"),
      duration: 1500,
      easing: Easing.linear,
    }).start();
  };

  const verifyPhone = () => {};

  const editMail = () => {};
  const editPhone = () => {};

  const iconSize = isWeb()
    ? globalWidth("2%")
    : isTablet()
    ? globalWidth("5%")
    : globalWidth("6%");

  const changeProfilePicture = () => {
    setIsLoading(true);
    dispatch(authActions.changeProfilePicture(profileURL)).then(() => {
      setSelectedImage("");
      dispatch(authActions.getProfile());
      setShowAlert(false);
      setIsLoading(false);
    });
  };

  const onImageSelected = (imageUri) => {
    setSelectedImage(imageUri);
    setShowAlert(true);
  };

  const userList = [
    {
      title: "Contact Information",
      element: () => (
        <ContactInformation
          email={profile.email}
          phone={profile.phone}
          emailVerified={profile.emailVerified}
          phoneVerified={profile.phoneVerified}
          verifyEmail={verifyEmail}
          verifyPhone={verifyPhone}
          editMail={editMail}
          editPhone={editPhone}
        />
      ),
    },
    {
      title: "Businesses",
      element: () => <UserBusinesses business={profile.business} />,
    },
    {
      title: "Subscription Details",
      element: () => (
        <UserPackage profile={profile} navigation={props.navigation} />
      ),
    },
    {
      title: "Payment History",
      element: () => <UserPayments payment={payments} profile={profile} />,
    },
  ];

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled scrollEventThrottle={16}>
        {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: profile.profilePicture }}
              style={styles.profile}
            />
            <TouchableOpacity
              onPress={() =>
                uploadImageFn({
                  imageName: profile.userName,
                  getURL: setProfileURL,
                  subFolder: "profile/",
                  onImageSelected: onImageSelected,
                })()
              }
              style={styles.cameraContainer}
            >
              <FontAwesome name="camera" size={28} color="#888" />
            </TouchableOpacity>
          </View>
          <HeaderText text={profile.userName} />
          <Text style={styles.position}>{profile.designation}</Text>
          <View style={{ height: 30 }} />
          <View style={styles.profileDetails}>
            {userList.map((item, index) => {
              return (
                <View style={styles.itemContainer}>
                  <Pressable
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut
                      );
                      setItemOpen(itemOpen === index ? -1 : index);
                      setCurrentIndex(index === currentIndex ? null : index);
                    }}
                    style={styles.itemHeader}
                  >
                    <View style={{ justifyContent: "center" }}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                    <AnimatedChevron isOpen={index === currentIndex} />
                  </Pressable>

                  {currentIndex === index && (
                    <View style={styles.itemContent}>{item.element()}</View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <Animated.View
          style={[
            styles.codeContainer,
            { transform: [{ translateY: codeContainerHeight }] },
          ]}
        >
          <Pressable onPress={cancelVerification}>
            <AntDesign name="closesquare" size={iconSize} color="white" />
          </Pressable>
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
      <WebAlert
        title="Change Profile Picture"
        showAlert={showAlert}
        message="By Clicking Confirm you will change your profile picture"
        onCancel={() => {
          setSelectedImage("");
          setShowAlert(false);
        }}
        onOk={changeProfilePicture}
        okText="Confirm"
        cancelText="Cancel"
      />
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
  imageContainer: {
    position: "relative",
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
  cameraContainer: {
    position: "absolute",
    bottom: 0,
    right: isTablet() ? globalWidth("40%") : globalWidth("32%"),
    backgroundColor: "white", // Background color of the button
    padding: 8, // Adjust the padding as needed
    borderRadius: 50, // To make it circular
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
  itemContainer: {
    width: "90%",
    justifyContent: "center",
    flexGrow: 1,
    alignSelf: "center",
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: Colors.lightBG,
    marginTop: globalHeight("0.3%"),
    borderRadius: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    height: globalHeight("7%"),
  },
  itemTitle: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("4%"),
    color: Colors.font,
  },
});

export default ProfileScreen;
