import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as membershipActions from "../../store/membership/MembershipActions";
import moment from "moment";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const PaymentDataDetails = (props) => {
  const { packageId, type, email, payment } = props;

  const { packages } = useSelector((state) => state.membership);
  const { user } = useSelector((state) => state.auth);

  const [packageDetails, setPackageDetails] = useState({});
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("DD/MM/YYYY")
  );
  const [endDate, setEndDate] = useState("");
  const [isTrial, setIsTrial] = useState(false);

  const dispatch = useDispatch();

  // get the packages in case of refresh

  useEffect(() => {
    dispatch(membershipActions.getPackages());
  }, [dispatch]);

  // get the package details
  useEffect(() => {
    if (packages.length > 0) {
      const packageDetails = packages.find((pkg) => pkg._id === packageId);
      setPackageDetails(packageDetails);
    }
  }, [packages]);

  // calculate the end date
  // if type === Monthly then add 30 days to the start date + 30 days trial
  // if type === Yearly then add 365 days to the start date + 30 days trial

  useEffect(() => {
    if (type === "Monthly") {
      const endDate = moment(startDate, "DD/MM/YYYY")
        .add(30, "days")
        .format("DD/MM/YYYY");
      setIsTrial(true);
      setEndDate(endDate);
    } else if (type === "Yearly") {
      const endDate = moment(startDate, "DD/MM/YYYY")
        .add(365, "days")
        .format("DD/MM/YYYY");

      setEndDate(endDate);
    }
  }, [startDate, type]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: packageDetails.backgroundColor },
        ]}
      >
        <Text style={styles.headerText}>{packageDetails.name}</Text>
      </View>
      <View style={styles.lowerComponent}>
        <Text style={styles.title}>
          Starting In: <Text style={styles.value}> {startDate} </Text>
        </Text>
        <Text style={styles.title}>
          Next Billing Date: <Text style={styles.value}> {endDate} </Text>
        </Text>
        <Text style={styles.title}>
          Next Billing Value:{" "}
          <Text style={styles.value}> ${parseInt(payment).toFixed(2)} </Text>
        </Text>
        <Text style={styles.title}>
          Billing Email: <Text style={styles.value}> {user.email} </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: globalHeight("5%"),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "headers",
    color: "#fff",
    fontSize: 22,
  },
  lowerComponent: {
    marginTop: 25,
  },
  title: {
    fontSize: 18,
    color: Colors.primary,
    fontFamily: "headers",
    lineHeight: 60,
  },
  value: {
    color: Colors.font,
    fontStyle: "italic",
  },
});

export const PaymentDataDetailsOptions = (navData) => {
  return {
    headerTitle: "PaymentDataDetails",
  };
};

export default PaymentDataDetails;
