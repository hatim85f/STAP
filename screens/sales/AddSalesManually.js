import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import TopBar from "./TopBar";
import Loader from "../../components/Loader";

import * as authActions from "../../store/auth/authActions";
import * as productsActions from "../../store/products/productsActions";
import moment from "moment";
import TableComp from "../../components/TableComp";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { Row, Rows, Table } from "react-native-table-component";
import Colors from "../../constants/Colors";

import Card from "../../components/Card";

import { AntDesign } from "@expo/vector-icons";

import numberWithComa from "../../components/helpers/numberWithComa";
import SalesList from "./SalesList";

const AddSalesManually = (props) => {
  const { products } = useSelector((state) => state.products);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [showingIndex, setShowingIndex] = useState(0);

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

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Fetching Products");
    dispatch(productsActions.getBusinessProducts()).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  // =================================================ANIMATING CARD CHANGES=======================================================

  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  //   =================================================ARRANGING PRODUCTS LIST=======================================================

  const addItem = (item) => {
    let newList = [...productsList];

    newList.push({
      productId: item._id,
      productName: item.productName,
      date: moment(new Date()).toISOString(),
      status: "Completed",
      quantity: 0,
      totalQuantity: 0,
      productPrice: item.costPrice,
      sellingPrice: item.sellingPrice,
      bonus: 0,
      bonusType: "Percentage",
      clientName: "Manual Addition",
      itemValue: 0,
      imageURL: item.imageURL,
      currencySymbol: item.currencySymbol,
      businessId: item.businessId,
    });

    setProductsList(newList);
  };

  const increaseShowIndex = () => {
    let newIndex = showingIndex + 1;

    if (newIndex >= products.length) {
      newIndex = 0;
    }

    Animated.timing(translateX, {
      toValue: -1000,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowingIndex(newIndex);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });

    setShowingIndex(newIndex);
  };

  const decreaseShowIndex = () => {
    let newIndex = showingIndex - 1;

    if (newIndex < 0) {
      newIndex = products.length - 1;
    }

    Animated.timing(translateX, {
      toValue: 1000,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowingIndex(newIndex);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });

    setShowingIndex(newIndex);
  };

  // ===============================================CHANGING LIST DATA=======================================================

  const changeItemCostPrice = (index, value) => {
    let newList = [...productsList];
    newList[index].productPrice = parseFloat(value);
    setProductsList(newList);
  };

  const changeItemSellingPrice = (index, value) => {
    let newList = [...productsList];
    newList[index].sellingPrice = parseFloat(value);
    setProductsList(newList);
  };

  const changeItemQuantity = (index, value) => {
    let newList = [...productsList];
    newList[index].quantity = parseFloat(value);
    newList[index].itemValue = parseFloat(value) * newList[index].sellingPrice;
    newList[index].totalQuantity = parseFloat(value);
    setProductsList(newList);
  };

  const changeClientName = (index, value) => {
    let newList = [...productsList];
    newList[index].clientName = value;
    setProductsList(newList);
  };

  const bonusTypeList = ["Percentage", "Fixed"];

  const changeBonusType = (index, value) => {
    let newList = [...productsList];
    newList[index].bonusType = value;

    if (value === "Percentage") {
      newList[index].totalQuantity =
        newList[index].quantity + (newList[index].quantity * value) / 100;
    } else {
      newList[index].totalQuantity = newList[index].quantity + value;
    }
    setProductsList(newList);
  };

  const changeDiscount = (index, value) => {
    let newList = [...productsList];
    newList[index].bonus = parseFloat(value);

    if (newList[index].bonusType === "Percentage") {
      newList[index].totalQuantity =
        newList[index].quantity +
        (newList[index].quantity * parseFloat(value)) / 100;
    } else {
      newList[index].totalQuantity =
        newList[index].quantity + parseFloat(value);
    }
    setProductsList(newList);
  };

  const removeItem = (index) => {
    let newList = [...productsList];
    newList.splice(index, 1);
    setProductsList(newList);
  };

  //   =======================================================RENDERING=======================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TopBar />
      <View style={styles.mainContainerRow}>
        <TouchableOpacity
          onPress={decreaseShowIndex}
          style={styles.buttonContainer}
        >
          <AntDesign
            name="leftcircle"
            size={globalWidth("2.5%")}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: "60%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {products.length > 0 &&
            products.map((item, index) => {
              return (
                index === showingIndex && (
                  <Card key={index} style={styles.card}>
                    <TouchableOpacity
                      onPress={() => addItem(item)}
                      style={styles.touchable}
                    >
                      <View
                        style={[
                          {
                            width: "20%",
                          },
                          styles.cardContainer,
                        ]}
                      >
                        <Image
                          source={{ uri: item.imageURL }}
                          style={styles.image}
                        />
                      </View>
                      <View style={[{ width: "50%" }, styles.cardContainer]}>
                        <Text style={styles.name}> {item.productName} </Text>
                        <Text style={styles.description}>
                          {" "}
                          {item.description}{" "}
                        </Text>
                      </View>
                      <View style={[{ width: "30%" }, styles.cardContainer]}>
                        <Text style={styles.name}>Cost Price</Text>
                        <Text style={styles.description}>
                          {" "}
                          {item.costPrice} {item.currencySymbol}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                )
              );
            })}
        </Animated.View>
        <TouchableOpacity
          onPress={increaseShowIndex}
          style={styles.buttonContainer}
        >
          <AntDesign
            name="rightcircle"
            size={globalWidth("2.5%")}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
      {productsList.length > 0 && (
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemsContainer}>
            <View style={styles.mainListContainer}>
              {productsList.map((item, index) => {
                return (
                  <View style={styles.itemDetails} key={index}>
                    <View style={[styles.itemsRow, { width: "40%" }]}>
                      <Text style={styles.name}> {index + 1}) </Text>
                      <Image
                        source={{ uri: item.imageURL }}
                        style={styles.image}
                      />
                      <Text style={styles.name}> {item.productName} </Text>
                    </View>
                    <View
                      style={[
                        styles.itemsRow,
                        { marginTop: globalHeight("1.5%") },
                      ]}
                    >
                      <Input
                        label="Cost Price"
                        defaultValue={item.productPrice.toString()}
                        onChangeText={(value) =>
                          changeItemCostPrice(index, value)
                        }
                        containerStyle={styles.itemInput}
                        style={styles.input}
                        labelStyle={styles.label}
                      />
                      <Input
                        label="Selling Price"
                        defaultValue={item.sellingPrice.toString()}
                        onChangeText={(value) =>
                          changeItemSellingPrice(index, value)
                        }
                        containerStyle={styles.itemInput}
                        style={styles.input}
                        labelStyle={styles.label}
                      />

                      <Input
                        label="Quantity"
                        value={item.quantity.toString()}
                        onChangeText={(value) =>
                          changeItemQuantity(index, value)
                        }
                        containerStyle={styles.itemInput}
                        style={styles.input}
                        labelStyle={styles.label}
                      />
                      <select
                        style={styles.selectionContainer}
                        onChange={(e) => changeBonusType(index, e.target.value)}
                      >
                        <option value="">Bonus Type</option>
                        {bonusTypeList.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </View>
                    <View style={styles.inputsContainer}>
                      <Input
                        label="Client Name"
                        value={item.clientName}
                        onChangeText={(value) => changeClientName(index, value)}
                        containerStyle={[styles.itemInput, { width: "95%" }]}
                        style={styles.input}
                        labelStyle={styles.label}
                      />
                      <Input
                        label="Discount"
                        value={item.bonus.toString()}
                        onChangeText={(value) => changeDiscount(index, value)}
                        containerStyle={[styles.itemInput, { width: "25%" }]}
                        style={styles.input}
                        labelStyle={styles.label}
                      />
                    </View>

                    <View style={styles.totalsContainer}>
                      <Text style={styles.total}>
                        {" "}
                        Total Quantity :{" "}
                        {isNaN(item.totalQuantity)
                          ? item.quantity
                          : numberWithComa(
                              parseFloat(item.totalQuantity).toFixed(0)
                            )}
                      </Text>
                      <Text style={styles.total}>
                        Total :{" "}
                        {numberWithComa(parseFloat(item.itemValue).toFixed(2))}{" "}
                        {item.currencySymbol}{" "}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.mainListContainer}>
              <SalesList
                list={productsList}
                onDelete={(index) => removeItem(index)}
                clearList={() => setProductsList([])}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "45%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: globalHeight("2%"),
  },
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: globalHeight("10%"),
    alignSelf: "center",
  },
  touchable: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  image: {
    width: globalWidth("4%"),
    height: globalWidth("4%"),
    borderRadius: globalWidth("2%"),
    borderColor: Colors.font,
    borderWidth: 1,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: globalHeight("10%"),
  },
  name: {
    fontFamily: "Poppins-Medium",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
    fontStyle: "italic",
    textAlign: "center",
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: globalWidth("0.6%"),
    color: Colors.primary,
    lineHeight: globalWidth("2%"),
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: globalHeight("2%"),
  },
  mainListContainer: {
    height: "100%",
    width: "49%",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    padding: globalWidth("1%"),
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
  },
  itemInput: {
    width: "20%",
  },
  input: {
    width: "20%",
  },
  label: {
    fontFamily: "Poppins-Medium",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  selectionContainer: {
    width: "30%",
    height: globalHeight("3.5%"),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "white",
    color: Colors.font,
    fontFamily: "Poppins-Regular",
    fontSize: globalWidth("1%"),
    cursor: "pointer",
  },
  itemDetails: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    padding: globalWidth("1%"),
  },
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("1%"),
    width: "60%",
    alignSelf: "center",
  },
  total: {
    fontFamily: "Poppins-Medium",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
});

export default AddSalesManually;
