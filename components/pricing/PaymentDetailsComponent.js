import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { isTablet, isWeb } from "../../constants/device";
import Colors from "../../constants/Colors";
import Loader from "../Loader";
import * as membershipActions from "../../store/membership/MembershipActions";
import { Octicons } from "@expo/vector-icons";
import numberWithComa from "../helpers/numberWithComa";

const PaymentDetailsComponent = (props) => {
  const { packageId, type } = props;

  const { packages } = useSelector((state) => state.membership);

  const [packageDetails, setPackageDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [packageFeatures, setPackageFeatures] = useState([]);
  const [packageLimits, setPackageLimits] = useState([]);
  const [packagePrices, setPackagePrices] = useState([]);
  const [packageType, setPackageType] = useState("");
  const [totalPrice, setTotalPrice] = useState("1500");

  const dispatch = useDispatch();

  // getting the packages from the server in case it's not loaded
  useEffect(() => {
    if (packages.length === 0) {
      setIsLoading(true);
      dispatch(membershipActions.getPackages()).then(() => {
        setIsLoading(false);
      });
    }
  }, [packages, dispatch]);

  const { features, limits, prices, price } = packageDetails;

  // getting the package details from the packages array as per the ID
  useEffect(() => {
    if (packages.length > 0) {
      setIsLoading(true);
      const packageDetails = packages.find((p) => p._id === packageId);
      setPackageDetails(packageDetails);
      setIsLoading(false);
    }
  }, [packageId, packages]);

  // preparing packages in arrays to be displayed in the screen
  useEffect(() => {
    const packageFeatures = [
      { label: "CRM", value: features?.crm },
      { label: "Inventory", value: features?.inventory },
      {
        label: "Manufacturing Management",
        value: features?.manufacturingManagement,
      },
      {
        label: "Supply Chain Management",
        value: features?.supplyChainManagement,
      },
      { label: "Marketing Management", value: features?.marketingManagement },
      { label: "Invoicing", value: features?.invoicing },
      { label: "Payment Link Creation", value: features?.paymentLinkCreation },
      { label: "Sales Management", value: features?.salesManagement },
      { label: "Team Target", value: features?.teamTarget },
      { label: "Products Target", value: features?.productsTarget },
    ];
    setPackageFeatures(packageFeatures);

    const packageLimits = [
      { label: "Businesses", value: limits?.businesses },
      {
        label: "Value Per Business Creation",
        value: `${limits?.valuePerBusiness} $`,
      },
      { label: "Team Members", value: limits?.teamMembers },
      { label: "Admins", value: limits?.admins },
      { label: "Products", value: limits?.products },
      { label: "Clients", value: limits?.clients },
    ];

    setPackageLimits(packageLimits);

    const packagePrices = [
      { label: "Business Owner", value: prices?.businessOwner },
      { label: "Admin", value: prices?.admin },
      { label: "Team Member", value: prices?.teamMember },
    ];

    setPackagePrices(packagePrices);
  }, [packageDetails]);

  // setting the package type to be displayed in the screen
  useEffect(() => {
    if (type === "Yearly") {
      setPackageType("yearly");
    } else {
      setPackageType("monthly");
    }
  }, [type]);

  // setting the total price to be displayed in the screen
  useEffect(() => {
    if (price) {
      setTotalPrice(price[packageType]);
    }
  }, [price, packageType]);

  const { totalMonthlyPrice, totalYearlyPrice } = packageDetails;

  // calcualting the final price to be displayed in the screen
  useEffect(() => {
    if (packageType === "monthly") {
      setTotalPrice(parseInt(totalMonthlyPrice));
    } else {
      setTotalPrice(parseInt(totalYearlyPrice));
    }
  }, [packageType, totalMonthlyPrice, totalYearlyPrice, packageDetails]);

  const submit = () => {
    console.log("submit");
  };

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          { backgroundColor: packageDetails.backgroundColor },
        ]}
      >
        <Text style={styles.name}> {packageDetails.name} </Text>
        <Text style={styles.subTitle}> {packageDetails.subTitle} </Text>
      </View>
      {packageDetails.name !== "Free Trial" && (
        <View style={styles.buttonsRow}>
          <Button
            title="Yearly"
            onPress={() => setPackageType("yearly")}
            buttonStyle={[
              styles.smallButton,
              {
                backgroundColor:
                  packageType === "yearly"
                    ? packageDetails.backgroundColor
                    : "white",
                borderColor:
                  packageType === "yearly"
                    ? "white"
                    : packageDetails.backgroundColor,
              },
            ]}
            titleStyle={[
              styles.smallTitle,
              {
                color: packageType === "yearly" ? "white" : Colors.primary,
              },
            ]}
          />
          <Button
            title="Monthly"
            onPress={() => setPackageType("monthly")}
            buttonStyle={[
              styles.smallButton,
              {
                backgroundColor:
                  packageType === "monthly"
                    ? packageDetails.backgroundColor
                    : "white",
                borderColor:
                  packageType === "monthly"
                    ? "white"
                    : packageDetails.backgroundColor,
              },
            ]}
            titleStyle={[
              styles.smallTitle,
              {
                color: packageType === "monthly" ? "white" : Colors.primary,
              },
            ]}
          />
        </View>
      )}
      <View style={styles.features}>
        {packageDetails.name !== "Free Trial" && (
          <Text style={styles.mainNote}>
            With{" "}
            {numberWithComa(
              packageType === "monthly"
                ? parseInt(totalMonthlyPrice)
                : parseInt(totalYearlyPrice)
            )}{" "}
            $ {packageType} Package Price you will get
          </Text>
        )}
        <View style={styles.featuresContainer}>
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: packageDetails.backgroundColor },
            ]}
          >
            <Text style={styles.title}>Features</Text>
          </View>
          <View style={styles.featuresList}>
            {packageFeatures.map((item, index) => {
              return (
                <View>
                  {item.value && (
                    <View style={styles.feature} key={index}>
                      <Octicons name="dot-fill" size={18} color={Colors.font} />
                      <Text style={styles.featureText}>{item.label}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: packageDetails.backgroundColor },
            ]}
          >
            <Text style={styles.title}>Reports</Text>
          </View>
          <View style={styles.featuresList}>
            {features?.visualizedReport?.map((item, index) => {
              return (
                <View style={styles.feature} key={index}>
                  <Octicons name="dot-fill" size={18} color={Colors.font} />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: packageDetails.backgroundColor },
            ]}
          >
            <Text style={styles.title}>Benefits</Text>
          </View>
          <View style={styles.featuresList}>
            {packageLimits?.map((item, index) => {
              return (
                <View style={styles.feature} key={index}>
                  <Octicons name="dot-fill" size={18} color={Colors.font} />
                  <Text style={styles.featureText}>
                    {" "}
                    {item.value > 100 ? "Unlimited" : item.value} {item.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: packageDetails.backgroundColor },
            ]}
          >
            <Text style={styles.title}>Prices</Text>
          </View>
          <View style={styles.featuresList}>
            {packagePrices?.map((item, index) => {
              return (
                <View style={styles.feature} key={index}>
                  <Octicons name="dot-fill" size={18} color={Colors.font} />
                  <Text style={styles.featureText}>
                    {" "}
                    {item.value} $ for {item.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <View
            style={[
              styles.titleContainer,
              { backgroundColor: packageDetails.backgroundColor },
            ]}
          >
            <Text style={styles.title}>Package Price</Text>
          </View>
          <View style={styles.feature}>
            <Octicons name="dot-fill" size={18} color={Colors.font} />
            <Text style={styles.featureText}>
              {" "}
              {price && price[packageType]} $ {packageType}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceTitleContainer}>
            <Text style={styles.priceText}>Total Price</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>
              {numberWithComa(
                packageType === "monthly"
                  ? parseInt(totalMonthlyPrice)
                  : parseInt(totalYearlyPrice)
              )}{" "}
              $
            </Text>
          </View>
        </View>
        <Button
          title={
            packageDetails.name === "Free Trial"
              ? "Start Free Trial"
              : `Make the payment of ${numberWithComa(
                  packageType === "monthly"
                    ? parseInt(totalMonthlyPrice)
                    : parseInt(totalYearlyPrice)
                )}$`
          }
          buttonStyle={[
            styles.priceButton,
            { backgroundColor: packageDetails.backgroundColor },
          ]}
          titleStyle={styles.priceButtonTitle}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: isWeb() ? "60%" : "90%",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginTop: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    shadowOpacity: 0.22,
    marginBottom: 25,
  },
  topContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    height: 100,
  },
  name: {
    fontFamily: "headers",
    fontSize: 22,
    marginBottom: 15,
  },
  subTitle: {
    fontFamily: "headers",
    fontSize: 16,
    color: "#000",
    fontStyle: "italic",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: isWeb() ? "30%" : "30%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 25,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  smallButton: {
    backgroundColor: "white",
    width: isWeb() ? 100 : isTablet() ? 100 : 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  smallTitle: {
    color: Colors.primary,
    fontFamily: "headers",
    fontSize: isWeb() ? 16 : isTablet() ? 14 : 12,
  },
  mainNote: {
    fontSize: isWeb() ? 22 : 16,
    color: Colors.primary,
    fontFamily: "headers",
    textAlign: "center",
  },
  featuresContainer: {
    padding: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  titleContainer: {
    marginLeft: -15,
    padding: 15,
    width: "30%",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    color: "white",
    fontFamily: "headers",
    fontSize: 18,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 30,
  },
  featureText: {
    fontSize: isWeb() ? 16 : 14,
    marginLeft: 10,
    fontFamily: "headers",
    color: Colors.font,
    lineHeight: 30,
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  priceText: {
    color: Colors.primary,
    fontSize: isWeb() ? 24 : 18,
    fontFamily: "headers",
    fontStyle: "italic",
  },
  priceButton: {
    width: isWeb() ? "50%" : "80%",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 25,
  },
  priceButtonTitle: {
    fontFamily: "headers",
    fontSize: isWeb() ? 22 : 16,
  },
});

export const PaymentDetailsComponentOptions = (navData) => {
  return {
    headerTitle: "PaymentDetailsComponent",
  };
};

export default PaymentDetailsComponent;
