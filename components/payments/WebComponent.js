import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { CheckBox } from "react-native-elements";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import moment from "moment";

import Colors from "../../constants/Colors";
import { globalWidth } from "../../constants/globalWidth";
import { isWeb } from "../../constants/device";

import * as membershipActions from "../../store/membership/MembershipActions";

const WebPaymentComponent = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const { clientSecret, packageId, type, payment, isUpgrade } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [autoRenew, setAutoRenew] = useState(false);
  const [savePayment, setSavePayment] = useState(false);
  const [readTerms, setReadTerms] = useState("");
  const [pyamentIsLoading, setpyamentIsLoading] = useState(false);
  const [endDate, setEndDate] = useState("");

  // navigating to terms and conditions page
  const handleLinkPress = () => {
    // Check if the app is running on a mobile device
    if (Platform.OS === "ios" || Platform.OS === "android") {
      // Use React Native's Linking API to navigate within the app
      Linking.openURL("/terms_and_conditions");
    } else {
      // Open a browser on other platforms (e.g., web)
      window.open("/terms_and_conditions", "_blank");
    }
  };

  // calculating end date
  const startDate = moment(new Date()).format("DD/MM/YYYY");

  useEffect(() => {
    if (type === "Monthly") {
      const endDate = moment(startDate, "DD/MM/YYYY")
        .add(30, "days")
        .format("DD/MM/YYYY");

      setEndDate(endDate);
    } else if (type === "Yearly") {
      const endDate = moment(startDate, "DD/MM/YYYY")
        .add(365, "days")
        .format("DD/MM/YYYY");

      setEndDate(endDate);
    }
  }, [startDate, type]);

  const dispatch = useDispatch();

  // handling submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setpyamentIsLoading(true);
    try {
      if (!stripe || !elements) {
        return;
      }

      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(error.message);
        handleError(submitError);
        return;
      }

      const paymentIntent = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:19006/packages/pricing-details`,
        },

        // Uncomment below if you only want redirect for redirect-based payments
        redirect: "if_required",
      });

      const paymentId = paymentIntent.paymentIntent.payment_method;

      if (paymentIntent.error) {
        setErrorMessage(paymentIntent.error.message);
        setIsDeclined(true);
        setIsSucceeded(false);
      } else {
        setIsSucceeded(true);
        setIsDeclined(false);
        setErrorMessage("Your payment was successful, Thank you");
      }

      if (paymentIntent) {
        if (isUpgrade) {
          console.log("UP");
          dispatch(
            membershipActions.upgradeSubscription(
              packageId,
              type,
              payment,
              autoRenew,
              savePayment,
              endDate,
              isUpgrade
            )
          ).then(() => {
            setpyamentIsLoading(false);
            window.location.href = "/profile";
          });
        } else {
          dispatch(
            membershipActions.addMemberShip(
              packageId,
              type,
              payment,
              autoRenew,
              "4242",
              savePayment,
              paymentId,
              endDate,
              isUpgrade
            )
          ).then(() => {
            setpyamentIsLoading(false);
            window.location.href = "/profile";
          });
          return;
        }
      }

      setpyamentIsLoading(false);
    } catch (error) {
      console.log(error);
      setpyamentIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PaymentElement />
      <View style={styles.checkContainer}>
        <CheckBox
          uncheckedColor="blue"
          checked={autoRenew}
          onPress={() => setAutoRenew(!autoRenew)}
          checkedColor={Colors.primary}
        />
        <Text style={styles.checkText}>Auto Renew</Text>
      </View>
      <View style={styles.checkContainer}>
        <CheckBox
          uncheckedColor="blue"
          checked={savePayment}
          onPress={() => setSavePayment(!savePayment)}
          checkedColor={Colors.primary}
        />
        <Text style={styles.checkText}>Save Payment for next time ?</Text>
      </View>
      <View style={styles.checkContainer}>
        <CheckBox
          uncheckedColor="blue"
          checked={readTerms}
          onPress={() => setReadTerms(!readTerms)}
          checkedColor={Colors.primary}
        />
        <Text style={styles.checkText}>I have read and agree to the </Text>
      </View>
      <Pressable onPress={handleLinkPress}>
        <Text style={styles.link}>Terms and Conditions</Text>
      </Pressable>
      {pyamentIsLoading ? (
        <View style={{ marginTop: 15 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <Pressable
          style={
            readTerms ? styles.paymentButton : styles.paymentButtonDisabled
          }
          onPress={handleSubmit}
          disabled={!readTerms}
        >
          <Text style={styles.paymentButtonText}>Pay Now</Text>
        </Pressable>
      )}
      {errorMessage && (
        <View
          style={[
            styles.errorContainer,
            { borderColor: isSucceeded ? "green" : "red" },
          ]}
        >
          <Text
            style={[
              styles.errorMessage,
              { color: isSucceeded ? "green" : "red" },
            ]}
          >
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {},
  errorContainer: {
    width: globalWidth("30%"),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    marginTop: 15,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "headers",
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
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "open-sans",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    textDecorationColor: "blue",
    cursor: "pointer",
  },
  paymentButtonDisabled: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: isWeb() ? "50%" : "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const webPaymentComponentOptions = (navData) => {
  return {
    headerTitle: "WebPaymentComponent",
  };
};

export default WebPaymentComponent;
