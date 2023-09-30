import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, CheckBox } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import Colors from "../../constants/Colors";
import Loader from "../../components/Loader";
import { isTablet, isWeb } from "../../constants/device";

import * as membershipActions from "../../store/membership/MembershipActions";
import numberWithComa from "../../components/helpers/numberWithComa";
import { ScrollView } from "react-native";

const Payment = (props) => {
  const { packageId, type } = props.route.params;
  const { packages } = useSelector((state) => state.membership);

  // states
  const [packageType, setPackageType] = useState("");
  const [packageDetails, setPackageDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [packagePrice, setPackagePrice] = useState("");
  const [packageFeatures, setPackageFeatures] = useState([]);
  const [packageLimits, setPackageLimits] = useState([]);
  const [packagePrices, setPackagePrices] = useState([]);

  const dispatch = useDispatch();

  //getting packages in case of refresh
  useEffect(() => {
    if (packages.length === 0) {
      setIsLoading(true);
      dispatch(membershipActions.getPackages()).then(() => {
        setIsLoading(false);
      });
    }
  }, [packages, dispatch]);

  //preparing to set package details
  useEffect(() => {
    setIsLoading(true);
    const packageDetails = packages.find((item) => item._id === packageId);
    setPackageDetails(packageDetails);
    setIsLoading(false);
  }, [packages, packageId]);

  // setting packge price
  useEffect(() => {
    if (packageDetails) {
      if (packageType === "Monthly") {
        setPackagePrice(packageDetails.totalMonthlyPrice);
      } else {
        setPackagePrice(packageDetails.totalYearlyPrice);
      }
    }
  }, [packageType, packageDetails]);

  // preparing packages in arrays to be displayed in the screen
  useEffect(() => {
    if (packageDetails) {
      const { features, limits, prices, price } = packageDetails;
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
        {
          label: "Payment Link Creation",
          value: features?.paymentLinkCreation,
        },
        { label: "Sales Management", value: features?.salesManagement },
        { label: "Team Target", value: features?.teamTarget },
        { label: "Products Target", value: features?.productsTarget },
      ];
      setPackageFeatures(packageFeatures);

      const packageLimits = [
        { label: "Businesses", value: limits?.businesses },
        // {
        //   label: "Value Per Business Creation",
        //   value: `${limits?.valuePerBusiness} $`,
        // },
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
    }
  }, [packageDetails]);

  // setting the package type to be displayed in the screen
  useEffect(() => {
    if (type === "Yearly") {
      setPackageType("Yearly");
    } else {
      setPackageType("Yearly");
    }
  }, [type]);

  console.log(packagePrice);

  if (isLoading) {
    return <Loader center />;
  }

  // submitting the package to the server
  const submitHandler = () => {
    // props.navigation.navigate("PaymentMethod", {
    //   packageId: packageId,
    //   type: packageType,
    // });
    console.log("submitting");
  };

  console.log(packageDetails ? packagePrices : null);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      {Platform.OS !== "web" && (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ marginTop: 5 }}
        >
          <AntDesign name="arrowleft" size={24} color={Colors.primary} />
        </TouchableOpacity>
      )}
      <ScrollView scrollEnabled scrollEventThrottle={16}>
        {packageDetails && (
          <View style={styles.pacakgeContainer}>
            <Text style={styles.header}>Start Your Subscription</Text>
            <Text style={styles.note}>
              {"     "}To Complete your purchase and get start uisng all your
              package's benefits, here is a summary of How Much you will pay and
              what you will get
            </Text>
            <View style={styles.packageTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.packageTypeButton,
                  packageType === "Monthly" && styles.activePackageType,
                ]}
                onPress={() => setPackageType("Monthly")}
              >
                <Text
                  style={[
                    styles.packageTypeButtonText,
                    packageType === "Monthly" && styles.activePackageTypeText,
                  ]}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.packageTypeButton,
                  packageType === "Yearly" && styles.activePackageType,
                ]}
                onPress={() => setPackageType("Yearly")}
              >
                <Text
                  style={[
                    styles.packageTypeButtonText,
                    packageType === "Yearly" && styles.activePackageTypeText,
                  ]}
                >
                  Yearly
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.packageDetails}>
              <View style={styles.priceRow}>
                <Text
                  style={[
                    styles.header,
                    { color: packageDetails.backgroundColor },
                  ]}
                >
                  {packageDetails.name}
                </Text>
                <Text style={styles.sign}>
                  ${" "}
                  <Text style={styles.header}>
                    {numberWithComa(parseInt(packagePrice))}
                  </Text>{" "}
                </Text>
              </View>
              <View style={styles.mainContainer}>
                <Text style={styles.header}>{packageType} Subscription</Text>
              </View>
              <View style={styles.rowItemsContainer}>
                {
                  // package features
                  packageFeatures?.map((item, index) => {
                    return (
                      <View style={styles.items} key={index}>
                        {item.value && (
                          <View style={styles.rowItems} key={index}>
                            <Text style={styles.itemList}>{item.label}</Text>
                            <CheckBox
                              checked={item.value}
                              checkedColor={Colors.primary}
                              size={isWeb() ? 22 : isTablet() ? 19 : 20}
                            />
                          </View>
                        )}
                      </View>
                    );
                  })
                }
              </View>
              <View style={styles.rowItemsContainer}>
                {
                  // package features
                  packageLimits?.map((item, index) => {
                    return (
                      <View style={styles.items} key={index}>
                        {item.value && (
                          <View
                            style={[
                              styles.rowItems,
                              {
                                width: isWeb()
                                  ? "75%"
                                  : isTablet()
                                  ? "70%"
                                  : "90%",
                              },
                            ]}
                            key={index}
                          >
                            <Text style={[styles.itemList, { lineHeight: 50 }]}>
                              {item.label}
                            </Text>
                            <Text style={styles.itemNuber}>{item.value}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })
                }
              </View>
              <View style={styles.rowItemsContainer}>
                {
                  // package features
                  packagePrices?.map((item, index) => {
                    return (
                      <View style={styles.items} key={index}>
                        {item.value && (
                          <View
                            style={[
                              styles.rowItems,
                              {
                                width: isWeb()
                                  ? "75%"
                                  : isTablet()
                                  ? "70%"
                                  : "100%",
                              },
                            ]}
                            key={index}
                          >
                            <Text style={[styles.itemList, { lineHeight: 50 }]}>
                              {item.label}
                            </Text>
                            <Text style={styles.itemNuber}>
                              {" "}
                              {item.value} $ / month
                            </Text>
                          </View>
                        )}
                      </View>
                    );
                  })
                }
              </View>
              <Button
                title={`Pay ${packagePrice} $`}
                onPress={submitHandler}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pacakgeContainer: {
    width: isWeb() ? "60%" : "95%",
    alignSelf: "center",
    padding: 15,
  },
  packageDetails: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 25,
  },
  note: {
    color: "#6a6b6c",
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: isWeb() ? 20 : isTablet() ? 18 : 16,
    marginTop: 10,
  },
  header: {
    fontFamily: Platform.OS === "ios" ? "headers" : "open-sans",
    fontSize: isWeb() ? 22 : isTablet() ? 20 : 18,
    fontWeight: "bold",
    color: "black",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  sign: {
    color: Colors.font,
    marginLeft: 10,
  },
  mainContainer: {
    padding: 10,
  },
  rowItemsContainer: {
    flexDirection: isWeb() ? "row" : "column",
    flexWrap: "wrap",
    borderTopColor: Colors.primary,
    borderTopWidth: 1.5,
    // justifyContent: "space-around",
  },
  items: {
    flexDirection: "column",
    flexWrap: "wrap",

    width: isWeb() ? "50%" : "60%",
  },
  rowItems: {
    width: isWeb() ? "80%" : isTablet() ? "80%" : "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemList: {
    fontFamily: Platform.OS === "ios" ? "headers" : "open-sans",
    fontSize: isWeb() ? 18 : isTablet() ? 16 : 14,
    color: "black",
    marginLeft: 10,
  },
  itemNuber: {
    fontFamily: "numbers",
    fontSize: isWeb() ? 20 : isTablet() ? 18 : 16,
  },
  buttonStyle: {
    width: isWeb() ? "50%" : isTablet() ? "50%" : "70%",
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 20,
  },
  titleStyle: {
    fontSize: isWeb() ? 22 : isTablet() ? 18 : 16,
    fontWeight: "bold",
  },
  packageTypeButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  packageTypeButton: {
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    width: "45%",
    opacity: 0.7, // Set the opacity for transparency
  },

  activePackageType: {
    backgroundColor: Colors.primary, // Highlight color when active
    opacity: 1, // Reset opacity when active
    width: "45%",
  },

  packageTypeButtonText: {
    color: "black",
    fontSize: 16,
  },

  activePackageTypeText: {
    color: "white", // Text color when active
    fontWeight: "bold",
  },
  packageTypeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export const PaymentOptions = (navData) => {
  return {
    headerTitle: "Payment",
  };
};

export default Payment;
