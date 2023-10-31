import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { isTablet, isWeb } from "../../constants/device";

import * as membershipActions from "../../store/membership/MembershipActions";
import * as authActions from "../../store/auth/authActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { Image } from "react-native";
import numberWithComa from "../../components/helpers/numberWithComa";
import Colors from "../../constants/Colors";
import process from "process";
import Loader from "../../components/Loader";
import WebPaymentComponent from "../../components/payments/WebComponent";
import PaymentDataDetails from "../../components/payments/PaymentDataDetails";
import AppPaymentComponent from "../../components/payments/AppPaymentComponent";
import { mainLink } from "../../store/mainLink";

const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

const MakeUpgrade = (props) => {
  const { packages } = useSelector((state) => state.membership);
  const { user, profile, token } = useSelector((state) => state.auth);
  const { packageId, type, email, payment } = props.route.params;

  const [receivePayment, setReceivePayment] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ephemeralKey, setEphemeralKey] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  // getting packages from redux store in case user refreshes the page
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(membershipActions.getPackages());
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(authActions.getProfile()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  // here is the page where we will get the clientSecret from the backend
  const fetchPaymentIntentClientSecret = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${mainLink}/api/membership/create-upgrade-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          amount: payment,
          currency: "usd",
          paymentMethodType: "card",
          userId: user._id,
          packageId: packageId,
          oldPackageId: profile.packageId,
          type: type,
        }),
      }
    );

    const resData = await response.json();

    const { clientSecret, ephemeralKey, customer } = resData;

    if (resData.message) {
      setErrorMessage(resData.message);
    }
    setClientSecret(clientSecret);
    setCustomerId(customer);
    setEphemeralKey(ephemeralKey);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (profile._id) {
      fetchPaymentIntentClientSecret().then(() => {
        setIsLoading(false);
      });
    }
  }, [profile._id]);

  if (isLoading) {
    return <Loader center message="Processing Payment" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.fullContainer}>
        {isWeb() && (
          <View style={styles.paymentDetails}>
            <PaymentDataDetails
              type={type}
              packageId={packageId}
              payment={payment}
            />
          </View>
        )}
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: globalWidth("3%"),
          }}
        >
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Payment Details</Text>
            </View>
            <View style={styles.cardsLogos}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/vectors/masterCard.png")}
                  style={styles.cardLogo}
                />
              </View>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/vectors/visa.png")}
                  style={styles.cardLogo}
                />
              </View>
            </View>
            <View style={styles.paymentContainer}>
              <Text style={styles.text}>Payment Amount</Text>
              <Text style={styles.number}>
                $ {numberWithComa(parseInt(payment).toFixed(2))} - Unconsumed
                Amount from previous Package
              </Text>
            </View>
            {Platform.OS === "web" && clientSecret && (
              <Elements
                stripe={loadStripe(publishableKey)}
                options={{
                  clientSecret: clientSecret,
                }}
              >
                <WebPaymentComponent
                  {...props}
                  clientSecret={clientSecret}
                  packageId={packageId}
                  type={type}
                  email={user.email}
                  payment={payment}
                  receivePayment={receivePayment}
                  isUpgrade={true}
                />
              </Elements>
            )}

            {errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.text}>{errorMessage}</Text>
                <Button
                  title="OK"
                  onPress={() => {
                    setErrorMessage(null);
                    props.navigation.navigate("Upgrade", {
                      packageId: profile.packageId,
                    });
                  }}
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    overflow: "scroll",
  },
  innerContainer: {
    width: isWeb()
      ? globalWidth("30%")
      : isTablet()
      ? globalWidth("60%")
      : globalWidth("90%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#e8e8e8",
    marginTop: 20,
    overflow: "hidden",
    paddingBottom: 10,
    boxShadow: "0px 0px 5px 0px #ccc",
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#ccc",
    width: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  paymentButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: isWeb() ? "50%" : "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardsLogos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardLogo: {
    width: 120,
    height: 80,
    margin: 10,
  },
  paymentContainer: {
    width: "80%",
    padding: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "grey",
  },
  number: {
    fontFamily: "numbers",
    fontSize: 18,
  },

  fullContainer: {
    flexDirection: isWeb() ? "row" : "column",
    flex: 1,
  },
  paymentDetails: {
    width: globalWidth("50%"),
    borderRightWidth: 2.5,
    borderRightColor: Colors.primary,
    padding: 15,
    height: globalHeight("80%"),
    marginTop: globalHeight("10%"),
    // flex: 1,
  },
  errorContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    marginTop: 15,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "headers",
    color: Colors.font,
  },
  button: {
    width: globalWidth("10%"),
    backgroundColor: "transparent",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.font,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "headers",
  },
});

export default MakeUpgrade;
