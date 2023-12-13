import React, { useState, useEffect, useRef, Fragment } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
import CustomSwiper from "../../components/customSwiper/CustomSwiper";

const ItemCreation = (props) => {
  console.log("Component rendered!");
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

  const [percentages, setPercentages] = useState([]);
  const [itemsValues, setItemsValues] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const tureValues = orderList.map((item) => {
      return item.bonusType === "Percentage" ? true : false;
    });

    setPercentages(tureValues);

    const bonusValues = orderList.map((item) => {
      return item.bonusType === "Value" ? true : false;
    });

    setItemsValues(bonusValues);
  }, [orderList]);

  const changeIndex = (direction) => {
    let index = currentIndex;
    if (direction === "right") {
      index += 1;
    } else {
      index -= 1;
    }

    if (index < 0) {
      index = 0;
    }

    if (index > orderList.length - 1) {
      index = orderList.length - 1;
    }

    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <CustomSwiper
        changeDirection={(direction) => changeIndex(direction)}
        width="100%"
        list={orderList}
        index={currentIndex}
      >
        {orderList.map((order, index) => {
          return (
            <Fragment key={index}>
              {index === currentIndex && (
                <View style={styles.slideContainer} key={index}>
                  <Image
                    source={{ uri: order.image }}
                    style={styles.avatarStyle}
                  />
                  <View style={styles.orderContainer}>
                    <View
                      style={[
                        styles.nameRow,
                        { width: "100%", justifyContent: "space-between" },
                      ]}
                    >
                      <Text style={styles.number}>
                        {index + 1})
                        <Text style={styles.name}> {order.productName} </Text>{" "}
                      </Text>

                      <View style={styles.smallRow}>
                        <TextInput
                          style={[
                            styles.input,
                            {
                              backgroundColor: "transparent",
                              fontSize: globalWidth("1%"),
                              fontFamily: "numbers",
                            },
                          ]}
                          keyboardType="numeric"
                          placeholder="Price"
                          onChangeText={(price) => changePrice(index, price)}
                          defaultValue={
                            order.price > 0 ? order.price.toString() : 0
                          }
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
                        defaultValue={order.quantity.toString()}
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
                      <View style={{ width: "25%" }}>
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
                              onPress={() => {
                                changeBonusType(index, "Percentage");
                                console.log(order.bonusType === "Percentage");
                              }}
                              checkedColor={Colors.primary}
                              style={{ cursor: "pointer" }}
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
                              checked={
                                itemsValues[index] === true ? true : false
                              }
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
                        defaultValue={order.bonusValue.toString()}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteItem(index)}
                      style={{
                        alignSelf: "flex-end",
                        width: globalWidth("5%"),
                      }}
                    >
                      <MaterialCommunityIcons
                        name="delete-sweep"
                        size={globalWidth("2%")}
                        color="#ff0055"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Fragment>
          );
        })}
      </CustomSwiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: globalHeight("60%"),
  },
  slideContainer: {
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  avatarStyle: {
    borderWidth: 1,
    borderColor: Colors.primary,
    zIndex: 100,
    height: globalWidth("7.5%"),
    width: globalWidth("7.5%"),
    borderRadius: globalWidth("3.75%"),
    borderWidth: 2.5,
    alignSelf: "center",
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: globalHeight("1%"),
    zIndex: -100,
  },
  value: {
    marginBottom: globalHeight("1%"),
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
  },
  number: {
    fontFamily: "numbers",
    fontSize: globalWidth("1.3%"),
    marginLeft: 15,
  },
  smallRow: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "40%",
    height: globalHeight("5%"),
    textAlign: "center",
    fontFamily: "numbers",
    fontSize: globalWidth("1.2%"),
  },
  valueContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    marginBottom: globalHeight("1%"),
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
  },
  deleteButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  slideWrapper: {
    height: globalHeight("60%"),
    borderWidth: 1.5,
    borderColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
  },
});

export default ItemCreation;
