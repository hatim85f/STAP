import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const TestPayment = (props) => {
  const { packageId, type, email, payment } = props.route.params;

  const [cardNumber, setCardNumber] = useState("4242424242424242");
  const [cardExpiryMonth, setCardExpiryMonth] = useState(10);
  const [cardExpiryYear, setCardExpiryYear] = useState(29);
  const [cvc, setCvc] = useState(652);
  const [autoRenew, setAutoRenew] = useState(false);
  const [savePayment, setSavePayment] = useState(false);

  const dispatch = useDispatch();

  const elements = useElements();
  const stripe = useStripe();

  const submitPayment = () => {
    stripe
      .createPaymentMethod({
        type: "card",
        card: {
          number: cardNumber,
          exp_month: cardExpiryMonth,
          exp_year: cardExpiryYear,
          cvc: cvc,
        },
      })
      .then((result) => {
        console.log(result);
      });

    // dispatch(
    //   membershipActions.addMemberShip(
    //     packageId,
    //     type,
    //     parseInt(payment),
    //     autoRenew,
    //     cardNumber.slice(-4),
    //     savePayment,
    //     "tok_visa",
    //     "07/11/2023"
    //   )
    // );
  };
  return (
    <View style={styles.container}>
      <Input label="Card Number" onChangeText={(text) => setCardNumber(text)} />
      <Input
        label="Card Expiry Month"
        onChangeText={(text) => setCardExpiryMonth(text)}
      />
      <Input
        label="Card Expiry Year"
        onChangeText={(text) => setCardExpiryYear(text)}
      />
      <Input label="CVC" onChangeText={(text) => setCvc(text)} />
      <CheckBox
        title="Auto Renew"
        checked={autoRenew}
        onPress={() => setAutoRenew(!autoRenew)}
      />
      <CheckBox
        title="Save Payment"
        checked={savePayment}
        onPress={() => setSavePayment(!savePayment)}
      />

      <Button title="Submit" onPress={submitPayment} />
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

export const TestPaymentOptions = (navData) => {
  return {
    headerTitle: "TestPayment",
  };
};

export default TestPayment;
