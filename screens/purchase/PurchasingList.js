import moment from "moment/moment";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithComa from "../../components/helpers/numberWithComa";

import { Entypo } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import * as productsActions from "../../store/products/productsActions";
import * as authActions from "../../store/auth/authActions";
import { Animated } from "react-native";
import Chevron from "../../components/Chevron";

const PurchasingList = (props) => {
  //   const { purchases } = props;

  const { products } = useSelector((state) => state.products);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails = window.localStorage.getItem("userDetails");

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getBusinessProducts());
  }, [dispatch]);

  useEffect(() => {
    const totals = purchases.map((purchase) => purchase.totalBill);
    const value = totals.reduce((acc, curr) => acc + curr, 0);

    setTotalValue(value);
  }, [purchases]);

  const purchases = [
    {
      _id: "6610791dd7edf56457cab7d9",
      order: [
        {
          product: "65fb34a87c7551def6b66699",
          quantity: 10,
          costPrice: 11.45,
          sellingPrice: 23.99,
          bonus: 0,
          totalQuantity: 10,
          expiryDate: null,
          previousStocks: 128,
          totalValue: 114.5,
          _id: "6610791dd7edf56457cab7da",
        },
      ],
      supplier: null,
      totalBill: 114.5,
      businessIds: ["65f608bc11b512ecb53ad589"],
      purchaseDate: "2024-04-05T22:20:13.926Z",
      __v: 0,
    },
    {
      _id: "66107935d7edf56457cab7e5",
      order: [
        {
          product: "65fb35037c7551def6b666a5",
          quantity: 3,
          costPrice: 6,
          sellingPrice: 24.99,
          bonus: 0,
          totalQuantity: 3,
          expiryDate: null,
          previousStocks: 463,
          totalValue: 18,
          _id: "66107935d7edf56457cab7e6",
        },
        {
          product: "65fb35667c7551def6b666b1",
          quantity: 4,
          costPrice: 16,
          sellingPrice: 36.99,
          bonus: 0,
          totalQuantity: 4,
          expiryDate: "N/A",
          previousStocks: 829,
          totalValue: 64,
          _id: "66107935d7edf56457cab7e7",
        },
      ],
      supplier: null,
      totalBill: 82,
      businessIds: ["65f608bc11b512ecb53ad589"],
      purchaseDate: "2024-04-05T22:20:37.407Z",
      __v: 0,
    },
    {
      _id: "66107991d7edf56457cab7f4",
      order: [
        {
          product: "65fb361a7c7551def6b666c9",
          quantity: 10,
          costPrice: 16,
          sellingPrice: 86.99,
          bonus: 0,
          totalQuantity: 10,
          expiryDate: null,
          previousStocks: 917,
          totalValue: 160,
          _id: "66107991d7edf56457cab7f5",
        },
        {
          product: "65fb34a87c7551def6b66699",
          quantity: 100,
          costPrice: 8,
          sellingPrice: 23.99,
          bonus: 1,
          totalQuantity: 101,
          expiryDate: "N/A",
          previousStocks: 128,
          totalValue: 800,
          _id: "66107991d7edf56457cab7f6",
        },
        {
          product: "65fb35d57c7551def6b666bd",
          quantity: 12,
          costPrice: 12,
          sellingPrice: 39.99,
          bonus: 0,
          totalQuantity: 12,
          expiryDate: "N/A",
          previousStocks: 925,
          totalValue: 144,
          _id: "66107991d7edf56457cab7f7",
        },
        {
          product: "65fb35667c7551def6b666b1",
          quantity: 1,
          costPrice: 15,
          sellingPrice: 36.99,
          bonus: 0,
          totalQuantity: 1,
          expiryDate: "N/A",
          previousStocks: 829,
          totalValue: 15,
          _id: "66107991d7edf56457cab7f8",
        },
      ],
      supplier: null,
      totalBill: 1119,
      businessIds: ["65f608bc11b512ecb53ad589"],
      purchaseDate: "2024-04-05T22:22:09.487Z",
      __v: 0,
    },
    {
      _id: "661079a7d7edf56457cab802",
      order: [
        {
          product: "65fb361a7c7551def6b666c9",
          quantity: 1,
          costPrice: 16,
          sellingPrice: 86.99,
          bonus: 0,
          totalQuantity: 1,
          expiryDate: null,
          previousStocks: 917,
          totalValue: 16,
          _id: "661079a7d7edf56457cab803",
        },
      ],
      supplier: "660f25e52b10ad39eb2a8262",
      totalBill: 16,
      businessIds: ["65f608bc11b512ecb53ad589"],
      purchaseDate: "2024-04-05T22:22:31.153Z",
      __v: 0,
    },
  ];

  const mainRef = useRef(null);

  const animatedMaxHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentIndex !== null) {
      // Expand the content
      Animated.timing(animatedMaxHeight, {
        toValue: globalHeight("25%"), // Set an appropriate maximum height
        duration: 300, // Adjust the duration as needed
        useNativeDriver: false, // Make sure to set this to false when animating height
      }).start();
    } else {
      // Collapse the content
      Animated.timing(animatedMaxHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.itemText,
          {
            textAlign: "center",
            marginBottom: globalHeight("1%"),
          },
        ]}
      >
        Total Value:{" "}
        <Text style={styles.itemValue}>{numberWithComa(totalValue)}</Text>
      </Text>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {purchases.map((item, index) => {
          return (
            <View style={styles.mainItemContainer} key={index}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentIndex(currentIndex === index ? null : index);
                }}
                style={styles.itemContainer}
                key={index}
              >
                <Text style={styles.itemText}>
                  {" "}
                  {moment(item.purchaseDate).format("DD / MM / YYYY")}{" "}
                </Text>
                <Text style={styles.itemValue}>
                  {" "}
                  Order Value: {numberWithComa(item.totalBill)}{" "}
                </Text>
                <Chevron
                  open={index === currentIndex}
                  close={currentIndex === null || currentIndex !== index}
                  setIndex={() =>
                    setCurrentIndex(currentIndex === index ? null : index)
                  }
                  nextAnimation={() => mainRef.current}
                />
              </TouchableOpacity>
              {index === currentIndex && (
                <Animated.View
                  style={{ height: animatedMaxHeight }}
                  ref={mainRef}
                >
                  <ScrollView
                    scrollEnabled
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                  >
                    {item.order.map((order, index) => {
                      return (
                        <View style={styles.lowerItemContainer} key={index}>
                          <Text
                            style={[
                              styles.lowerItemText,
                              {
                                color: "black",
                                textDecorationColor: "black",
                                textDecorationLine: "underline",
                                marginBottom: globalHeight("1%"),
                              },
                            ]}
                          >
                            {" "}
                            {
                              products.find(
                                (product) => product._id === order.product
                              ).productNickName
                            }{" "}
                          </Text>
                          <Text style={styles.lowerItemText}>
                            {" "}
                            Quantity: {order.quantity}{" "}
                          </Text>
                          <Text style={styles.lowerItemText}>
                            {" "}
                            Cost Price: {numberWithComa(order.costPrice)}{" "}
                          </Text>
                          <Text style={styles.lowerItemText}>
                            {" "}
                            Selling Price: {numberWithComa(
                              order.sellingPrice
                            )}{" "}
                          </Text>
                          <Text style={styles.lowerItemText}>
                            {" "}
                            Total Value: {numberWithComa(order.totalValue)}{" "}
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </Animated.View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: globalWidth("1%"),
  },
  mainItemContainer: {
    width: "75%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: globalWidth("1%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: Colors.font,
    borderRadius: 10,
    marginVertical: globalHeight("0.5%"),
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lowerItemContainer: {
    padding: globalWidth("1%"),
    backgroundColor: Colors.lightBG,
    marginVertical: globalHeight("0.5%"),
    borderRadius: 10,
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
  },
  itemText: {
    fontFamily: "open-sans-bold",
    fontSize: globalWidth("1.2%"),
    color: Colors.font,
  },
  itemValue: {
    fontFamily: "open-sans",
    fontSize: globalWidth("1.2%"),
    color: Colors.font,
    fontStyle: "italic",
  },
  lowerItemText: {
    fontFamily: "open-sans",
    fontSize: globalWidth("1.1%"),
    color: Colors.font,
    lineHeight: globalHeight("2.5%"),
  },
});

export const PurchasingListOptions = (navData) => {
  return {
    headerTitle: "PurchasingList",
  };
};

export default PurchasingList;
