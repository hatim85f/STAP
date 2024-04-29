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
  const { purchases } = props;

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
