import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import MainInput from "../../components/MainInput";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import * as authActions from "../../store/auth/authActions";
import Loader from "../../components/Loader";
import { isWeb } from "../../constants/device";
import { globalHeight } from "../../constants/globalWidth";
import PaymentDetailsComponent from "../../components/pricing/PaymentDetailsComponent";

const PaymentDetails = (props) => {
  const { packageId, type } = props.route.params;
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [mailIsValid, setMailIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setMailIsValid(false);
    } else {
      setMailIsValid(true);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
      props.navigation.setParams({ hidePaymentOptions: true });
    }
  }, [isLoggedIn]);

  const submit = () => {
    setIsLoading(true);
    handleBlur();
    if (email.length === 0) {
      setMailIsValid(false);
      setIsLoading(false);
    } else {
      setMailIsValid(true);
      setShowLogin(false);
    }
  };

  console.log(packageId);

  return (
    <View style={styles.container}>
      <PaymentDetailsComponent packageId={packageId} type={type} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    height: 100,
    width: 100,
    marginLeft: 10,
  },
  loginContainer: {
    width: isWeb() ? "30%" : "85%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    padding: 15,
    marginTop: globalHeight("2%"),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    justifyContent: "center",
  },
  note: {
    fontFamily: "headers",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: isWeb() ? "30%" : "60%",
    alignSelf: "center",
  },
  titleStyle: {
    color: Colors.primary,
    fontFamily: "headers",
  },
});

export const paymentOptions = (navData) => {
  const hidePaymentOptions = navData.route.params?.hidePaymentOptions || false;
  return {
    headerTitle: hidePaymentOptions ? null : "Payment",
    headerStyle: {
      backgroundColor: "rgba(135, 0, 243, 0.18)",
      height: 100,
    },
    headerTintColor: Colors.font,
    headerTitleStyle: {
      fontSize: 22,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "headers",
    },

    headerLeft: () => {
      return (
        <Pressable
          onPress={() => {
            navData.navigation.navigate("Login");
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
        </Pressable>
      );
    },
  };
};

export default PaymentDetails;
