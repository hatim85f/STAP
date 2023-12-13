import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Switch,
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import CustomInput from "../../components/appComponents/Input/Input";
import {
  Octicons,
  FontAwesome5,
  Ionicons,
  Foundation,
} from "@expo/vector-icons";
import AppLoader from "../../components/AppLoader";
import numberWithComa from "../../components/helpers/numberWithComa";
import Card from "../../components/Card";
import { DateTimePicker } from "@react-native-community/datetimepicker";
import moment from "moment";
import PhasingModal from "../../components/target/PhasingModal.js";
import * as targetAction from "../../store/target/targetActions";
import * as productsActions from "../../store/products/productsActions";
import * as authActions from "../../store/auth/authActions";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import DatePicker from "../../components/DatePicker.js";
import CustomisedPicker from "../../components/DatePicker.js";

const TargetAddScreen = (props) => {
  const { productIndex } = props.route.params;

  const { products } = useSelector((state) => state.products);
  const { phasing } = useSelector((state) => state.target);
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({});
  const [startPeriod, setStartPeriod] = useState(new Date());
  const [targetUnits, setTargetUnits] = useState(0);
  const [productPrice, setProductPrice] = useState(null);
  const [targetType, setTargetType] = useState("");
  const [withPhasing, setWithPhasing] = useState(false);
  const [phasingData, setPhasingData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(productIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [openPhasing, setOpenPhasing] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");

          console.log(storedUserDetails, "Details");
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

  useEffect(() => {
    dispatch(productsActions.getBusinessProducts());
  }, [dispatch]);

  // getting the product details from products array
  useEffect(() => {
    const neededProduct = products[currentIndex];

    setProduct(neededProduct);
    setProductPrice(neededProduct?.costPrice);
  }, [products, currentIndex]);

  const returnToDefault = () => {
    setTargetUnits(0);
    setProductPrice(products[currentIndex]?.costPrice);
    setTargetType("");
    setWithPhasing(false);
    setPhasingData("");
    setStartPeriod(new Date());
  };

  // / changing index to change the product
  const previousIndex = () => {
    let newIndex = parseInt(currentIndex) - 1;
    if (newIndex < 0) {
      newIndex = parseInt(products.length) - 1;
    }
    setCurrentIndex(newIndex);
    returnToDefault();
  };

  const nextIndex = () => {
    let newIndex = parseInt(currentIndex) + 1;
    if (newIndex > products.length - 1) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
    returnToDefault();
  };

  // change date to start period
  const onChange = (event, newDate) => {
    setStartPeriod(newDate);
  };

  useEffect(() => {
    if (withPhasing) {
      setOpenPhasing(true);
    } else {
      setOpenPhasing(false);
    }
  }, [withPhasing]);

  useEffect(() => {
    dispatch(targetAction.getPhasing());
  }, [dispatch]);

  const submitTarget = () => {
    if (!targetType) {
      Alert.alert("Target Type is required");
      return;
    }
    setIsLoading(true);
    dispatch(
      targetAction.addTarget(
        product._id,
        product.businessId,
        parseInt(targetUnits),
        parseInt(productPrice),
        targetType,
        withPhasing,
        phasingData,
        startPeriod
      )
    ).then(() => {
      setPhasingData("");
      setTargetUnits(0);
      setWithPhasing(false);
      setIsLoading(false);
      window.location.href = `/products/show-products`;
    });
  };

  const targetTypes = [
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Yearly", value: "Yearly" },
    { label: "Bulk", value: "Bulk" },
  ];

  useEffect(() => {
    if (day && month && year) {
      setStartPeriod(new Date(year, parseInt(month) - 1, day));
    }
  }, [day, month, year]);

  useEffect(() => {
    if (targetUnits === 0 || !targetType) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [targetUnits, targetType]);

  if (!product) {
    return <AppLoader />;
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <TouchableOpacity
        onPress={() => (window.location.href = `/products/show-products`)}
        style={styles.buttonContainer}
      >
        <Ionicons
          name="arrow-back-sharp"
          size={30}
          color={Platform.OS === "ios" ? "white" : Colors.primary}
        />
      </TouchableOpacity>
      <View style={styles.upperView}>
        <TouchableOpacity
          onPress={previousIndex}
          disabled={products.length === 1}
        >
          <FontAwesome5 name="backward" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.productDetails}>
          <Avatar
            source={{ uri: product.imageURL }}
            avatarStyle={styles.avatar}
            size={globalWidth("10%")}
            rounded
          />
          <Text style={styles.header}>{product.productNickName}</Text>
        </View>
        <TouchableOpacity onPress={nextIndex} disabled={products.length === 1}>
          <FontAwesome5 name="forward" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.lowerView}>
        <Text style={styles.header}>
          Cost Price (CIF): {product.currencyCode}{" "}
          {productPrice ? numberWithComa(parseInt(productPrice)) : 0}{" "}
        </Text>
      </View>

      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{
          width: globalWidth("60%"),
          alignSelf: "center",
        }}
      >
        <View style={styles.details}>
          <Card style={styles.card}>
            <CustomInput
              onChangeText={(text) => setProductPrice(text)}
              label="Change Cost Price"
              keyboardType="numeric"
              value={productPrice && productPrice}
              returnKeyLabel="Done"
              labelStyle={{ color: "#000", textAlign: "center" }}
              style={{ textAlign: "center" }}
              rightIcon={() => {
                return (
                  <Text style={styles.code}> {product.currencyCode} </Text>
                );
              }}
            />
            <FontAwesome5
              name="money-bill-wave-alt"
              size={globalWidth("2%")}
              color={Colors.primary}
            />
          </Card>

          <Card style={styles.card}>
            <Text style={styles.label}>Start Period</Text>

            <Text style={[styles.data, { marginTop: 10 }]}>
              {moment(startPeriod).format("DD-MM-YYYY")}
            </Text>
            <View style={styles.dateRow}>
              <Input
                placeholder="Day"
                style={styles.dateInput}
                containerStyle={styles.inputContainer}
                onChangeText={(text) => setDay(text)}
                errorMessage={day > 31 ? "Invalid Day" : ""}
                errorStyle={styles.errorStyle}
                value={day}
              />
              <Input
                placeholder="Month"
                style={styles.dateInput}
                containerStyle={styles.inputContainer}
                onChangeText={(text) => setMonth(text)}
                errorMessage={month > 12 ? "Invalid Month" : ""}
                errorStyle={styles.errorStyle}
                value={month}
              />
              <Input
                placeholder="Year"
                style={styles.dateInput}
                containerStyle={styles.inputContainer}
                onChangeText={(text) => setYear(text)}
                value={year}
                errorStyle={styles.errorStyle}
                errorMessage={year.length > 4 ? "Invalid Year" : ""}
              />
            </View>
            <Ionicons
              name="calendar-outline"
              size={globalWidth("2.5%")}
              color={Colors.primary}
            />
          </Card>
        </View>
        <View style={styles.details}>
          <Card style={styles.card}>
            <CustomInput
              onChangeText={(text) => setTargetUnits(text)}
              label="Target Units"
              keyboardType="numeric"
              value={targetUnits.toString()}
              labelStyle={{ color: "#000", textAlign: "center" }}
              style={{ textAlign: "center" }}
              rightIcon={() => {
                return (
                  <Octicons
                    name="number"
                    size={globalWidth("1.5%")}
                    color="black"
                  />
                );
              }}
            />
            <Foundation
              name="target-two"
              size={globalWidth("2.2%")}
              color={Colors.primary}
            />
          </Card>
          <Card style={styles.card}>
            <Text style={styles.label}>Target Type</Text>
            {targetTypes.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    item.value === targetType
                      ? setTargetType("")
                      : setTargetType(item.value);
                  }}
                  key={index}
                  style={[
                    styles.targetBtn,
                    {
                      backgroundColor:
                        targetType === item.value ? Colors.primary : "white",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      {
                        color:
                          targetType === item.value ? "white" : Colors.primary,
                        fontSize: globalWidth("1%"),
                      },
                    ]}
                  >
                    {" "}
                    {item.label}{" "}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </Card>
        </View>
        <View style={styles.details}>
          <Card style={styles.card}>
            <Text style={styles.label}>Do you have a phasing plan ? </Text>
            <input
              type="checkbox"
              onChange={() => setWithPhasing(!withPhasing)}
              checked={withPhasing}
              color={Colors.primary}
              style={{
                width: 40, // Set the width to match your desired switch size
                height: 20, // Set the height to match your desired switch size
                backgroundColor: withPhasing ? "#007AFF" : "#ccc", // Background color when checked or unchecked
                borderRadius: 10,
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              className="custom-switch" // You can add a class for styling
            />
            <Text style={styles.note}>You will need to Select Phasing</Text>
          </Card>
          <Card style={styles.card}>
            {isLoading ? (
              <ActivityIndicator
                animating={isLoading}
                size="large"
                color={Colors.primary}
              />
            ) : (
              <>
                <Text
                  style={[
                    styles.priceData,
                    {
                      color: Colors.primary,
                    },
                  ]}
                >
                  Target Value
                </Text>
                <Text
                  style={[
                    styles.priceData,
                    {
                      color: Colors.primary,
                    },
                  ]}
                >
                  {productPrice && targetUnits
                    ? numberWithComa(parseInt(productPrice * targetUnits))
                    : 0}{" "}
                </Text>
                <Button
                  title="Submit Target"
                  onPress={submitTarget}
                  buttonStyle={styles.submitBtn}
                  titleStyle={styles.title}
                  disabled={btnDisabled}
                />
              </>
            )}
          </Card>
        </View>
      </ScrollView>
      <View style={{ height: 50 }} />
      <PhasingModal
        isVisible={openPhasing}
        phasing={phasing}
        closeModal={() => {
          setOpenPhasing(false);
          setWithPhasing(false);
        }}
        onSelectedPhasing={(data) => {
          setPhasingData(data);
          setOpenPhasing(false);
          setWithPhasing(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    paddingLeft: globalWidth("2%"),
  },
  upperView: {
    width: globalWidth("40%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  productDetails: {
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontFamily: "headers",
    color: Colors.primary,
    fontSize: globalWidth("1.2%"),
    marginBottom: 10,
  },
  avatar: {},
  lowerView: {
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  priceData: {
    color: Platform.OS === "android" ? Colors.primary : "white",
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    marginBottom: 10,
  },
  details: {
    flex: 1,
    width: globalWidth("60%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    elevation: 10,
  },
  card: {
    borderWidth: 1.2,
    padding: 10,
    paddingBottom: 0,
    width: "48%",
    height: globalHeight("20%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  data: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    color: Colors.primary,
    textAlign: "center",
  },
  label: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
    marginBottom: 10,
  },
  targetBtn: {
    width: "100%",
    borderRadius: 10,
  },
  note: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: globalWidth("1.2%"),
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    color: Colors.primary,
  },
  checkBox: {
    width: globalWidth("1.5%"),
    height: globalWidth("1.5%"),
    cursor: "pointer",
    width: 40, // Set the width to match your desired switch size
    height: 20, // Set the height to match your desired switch size
    backgroundColor: "#ccc", // Background color when unchecked
    borderRadius: 10,
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  customSwitchChecked: {
    backgroundColor: "#007AFF", // Background color when checked
  },
  customSwitchThumb: {
    width: 18, // Size of the switch handle
    height: 18, // Size of the switch handle
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    top: 1, // Adjust as needed for vertical alignment
    left: 1, // Adjust as needed for horizontal alignment
    transition: "left 0.3s",
  },
  dateInput: {
    width: "60%",
    borderColor: Colors.primary,
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: "center",
    height: "20%",
    fontSize: globalWidth("1.2%"),
    fontFamily: "headers",
  },
  code: {
    fontSize: globalWidth("1.2%"),
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dateInput: {
    width: "25%",
    textAlign: "center",
    alignSelf: "center",
  },
  inputContainer: {
    width: "25%",
  },
  errorStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TargetAddScreen;
