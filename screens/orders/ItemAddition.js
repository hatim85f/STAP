import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { isTablet } from "../../constants/device";
import numberWithComa from "../../components/helpers/numberWithComa";
import Swiper from "react-native-web-swiper";

const ItemAddition = (props) => {
  const {
    orderList,
    changePrice,
    addQuantity,
    changeBonus,
    changeBonusType,
    deleteItem,
    productIsOpened,
    availableIndex,
    setAvailableIndex,
  } = props;

  const swiperRef = useRef(null);

  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    setItemsList(orderList.map((x) => x));
  }, [orderList]);

  useEffect(() => {
    // After the orderList is updated, focus on the newly added item
    if (swiperRef.current && availableIndex !== null) {
      swiperRef.current.scrollBy(
        availableIndex - swiperRef.current.state.index,
        true
      );
      setAvailableIndex(null); // Reset availableIndex after focusing
    }
  }, [orderList, availableIndex, setAvailableIndex]);

  console.log(orderList);

  const DynamicSlide = () => {
    return (
      <>
        {itemsList &&
          itemsList.map((order, index) => {
            return (
              <View style={styles.slideContainer} key={index}>
                <Avatar
                  rounded
                  source={{ uri: order.image }}
                  size={isTablet() ? globalWidth("10%") : globalWidth("15%")}
                  avatarStyle={styles.avatarStyle}
                />
                <View style={styles.orderContainer} key={index}>
                  <View
                    style={[
                      styles.nameRow,
                      { width: "100%", justifyContent: "space-between" },
                    ]}
                  >
                    <Text style={styles.number}>
                      {" "}
                      {index + 1}){" "}
                      <Text style={styles.name}> {order.productName} </Text>{" "}
                    </Text>

                    <View style={styles.smallRow}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: "transparent",
                            fontSize: isTablet()
                              ? globalWidth("2.5%")
                              : globalWidth("3.5%"),
                          },
                        ]}
                        keyboardType="numeric"
                        placeholder="Price"
                        onChangeText={(price) => changePrice(index, price)}
                        value={order.price > 0 ? order.price.toString() : 0}
                      />
                      <Text style={styles.number}> {order.currency} </Text>
                    </View>
                  </View>
                  <View style={styles.nameRow}>
                    <Input
                      containerStyle={styles.input}
                      style={{ textAlign: "center" }}
                      keyboardType="numeric"
                      placeholder="Quantity"
                      onChangeText={(qty) => addQuantity(index, qty)}
                      value={order.quantity.toString()}
                    />
                    <View style={styles.valueContainer}>
                      <Text style={styles.value}> Value </Text>
                      <Text style={styles.value}>
                        {" "}
                        {order.total
                          ? numberWithComa(parseInt(order.total).toFixed(0))
                          : 0}{" "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.nameRow}>
                    <View style={{ width: "40%" }}>
                      <Text style={[styles.value, { textAlign: "center" }]}>
                        {" "}
                        Bonus Type{" "}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckBox
                            onPress={() => changeBonusType(index, "Percentage")}
                            checkedColor={Colors.primary}
                            checked={order.bonusType === "Percentage"}
                          />
                          <Text style={styles.value}> Percentage </Text>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckBox
                            onPress={() => changeBonusType(index, "Value")}
                            checked={order.bonusType === "Value"}
                            checkedColor={Colors.primary}
                          />
                          <Text style={styles.value}> Value </Text>
                        </View>
                      </View>
                    </View>
                    <Input
                      style={{ textAlign: "center" }}
                      containerStyle={styles.input}
                      keyboardType="numeric"
                      placeholder="Bonus"
                      onChangeText={(bonus) => changeBonus(index, bonus)}
                      value={order.bonusValue.toString()}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteItem(index)}
                    style={{
                      alignSelf: "flex-end",
                      width: globalWidth("20%"),
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete-sweep"
                      size={isTablet() ? globalWidth("5%") : globalWidth("6%")}
                      color="#ff0055"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Swiper></Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   // flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // orderContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  //   marginTop: 20,
  //   padding: 10,
  //   borderRadius: 10,
  //   borderBottomColor: Colors.primary,
  //   borderBottomWidth: 1,
  // },
  // orderListContainer: {
  //   zIndex: 100,
  //   elevation: 10,
  //   flex: 1,
  //   height: globalHeight("80%"),
  //   marginTop: globalHeight("5%"),
  // },
  // nameRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  //   width: "100%",
  //   marginTop: globalHeight("1%"),
  //   zIndex: -100,
  // },
  // input: {
  //   width: "50%",
  //   height: globalHeight("5%"),
  //   textAlign: "center",
  //   fontFamily: "headers",
  //   fontSize: isTablet() ? globalWidth("3%") : globalWidth("5%"),
  // },
  // orderContainer: {
  //   width: "90%",
  //   alignSelf: "center",
  //   marginTop: globalHeight("2%"),
  //   padding: globalWidth("1%"),
  //   borderRadius: 10,
  //   borderBottomColor: Colors.primary,
  //   borderBottomWidth: 1,
  // },
  // valueContainer: {
  //   width: "50%",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // value: {
  //   marginBottom: globalHeight("1%"),
  //   fontFamily: "headers",
  //   fontSize: isTablet() ? globalWidth("2%") : globalWidth("3.5%"),
  // },
  // number: {
  //   fontFamily: "numbers",
  //   fontSize: isTablet() ? globalWidth("3%") : globalWidth("5%"),
  // },
  // smallRow: {
  //   width: "40%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  // deleteButton: {
  //   alignSelf: "flex-end",
  //   marginTop: 10,
  // },
  // avatarStyle: {
  //   borderWidth: 1,
  //   borderColor: Colors.primary,
  //   zIndex: 100,
  // },
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slide1: {
    backgroundColor: "rgba(20,20,200,0.3)",
  },
  slide2: {
    backgroundColor: "rgba(20,200,20,0.3)",
  },
  slide3: {
    backgroundColor: "rgba(200,20,20,0.3)",
  },
});

export default ItemAddition;
