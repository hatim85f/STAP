import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import DropDownPicker from "react-native-dropdown-picker";

import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";

import { MaterialIcons } from "@expo/vector-icons";
import numberWithComa from "../../components/helpers/numberWithComa";

const OrdersCreation = (props) => {
  const { onSubmit, productsList, setOrder, products, submitIsLoading } = props;

  const [newOrder, setNewOrder] = useState([
    {
      product: null,
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      bonus: 0,
      totalQuantity: 0,
      expiryDate: null,
      totalValue: 0,
      itemName: "Not Yet Detected",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [newProductsList, setNewProductsList] = useState(productsList);

  // =======================================================HANDLE ORDER========================================================

  const addNewOrder = () => {
    let addedOrder = [...newOrder];
    addedOrder.push({
      product: null,
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      bonus: 0,
      totalQuantity: 0,
      expiryDate: "N/A",
      totalValue: 0,
      itemName: "Not Yet Detected",
    });

    setNewOrder(addedOrder);
  };

  const removeItem = (index) => {
    let updatedOrder = [...newOrder];
    updatedOrder.splice(index, 1);

    setNewOrder(updatedOrder);
  };

  const changeProduct = (value, index) => {
    let updatedOrder = [...newOrder];
    updatedOrder[index].product = value;

    const itemName = newProductsList.find((p) => p.value === value).label;
    updatedOrder[index].itemName = itemName;

    const costPrice = products.find((p) => p._id === value).costPrice;
    updatedOrder[index].costPrice = costPrice;
    costPrice;
    const sellingPrice = products.find((p) => p._id === value).sellingPrice;
    updatedOrder[index].sellingPrice = sellingPrice;

    setNewOrder(updatedOrder);
  };

  // ========================================================CHANGE QUANTITY========================================================

  const changeQuantity = (value, index) => {
    let updatedOrder = [...newOrder];
    updatedOrder[index].quantity = +value;

    const totalQuantity =
      updatedOrder[index].quantity + updatedOrder[index].bonus;
    updatedOrder[index].totalQuantity = totalQuantity;

    const totalValue = +value * updatedOrder[index].costPrice;
    updatedOrder[index].totalValue = totalValue;

    setNewOrder(updatedOrder);
  };

  const changeBonus = (value, index) => {
    let updatedOrder = [...newOrder];
    updatedOrder[index].bonus = +value;

    const totalQuantity =
      updatedOrder[index].quantity + updatedOrder[index].bonus;

    updatedOrder[index].totalQuantity = totalQuantity;

    setNewOrder(updatedOrder);
  };

  const changeExpiryDate = (value, index) => {
    let updatedOrder = [...newOrder];
    updatedOrder[index].expiryDate = value;

    setNewOrder(updatedOrder);
  };

  const changeCostPrice = (value, index) => {
    let updatedOrder = [...newOrder];
    updatedOrder[index].costPrice = +value;

    const totalValue = updatedOrder[index].quantity * +value;
    updatedOrder[index].totalValue = totalValue;

    setNewOrder(updatedOrder);
  };

  // ======================================================SENDING DATA TO PARENT========================================================

  useEffect(() => {
    setOrder(newOrder);
  }, [newOrder]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          title="Add New Item"
          onPress={addNewOrder}
        />
      </View>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.contentView}>
            {newOrder.length > 0 &&
              newOrder.map((item, index) => {
                return (
                  <View style={styles.itemContainer}>
                    <View style={{ width: "75%" }}>
                      <select
                        style={styles.select}
                        onChange={(e) => changeProduct(e.target.value, index)}
                      >
                        <option style={styles.optionText} value={null}>
                          {" "}
                          {"Select Product" ||
                            newProductsList.find(
                              (p) => p.value === item.product
                            ).label}{" "}
                        </option>
                        {newProductsList.map((product) => {
                          return (
                            <option
                              style={styles.optionText}
                              value={product.value}
                            >
                              {product.label}
                            </option>
                          );
                        })}
                      </select>
                      <View style={styles.smallRow}>
                        <Input
                          style={styles.input}
                          placeholder="Quantity"
                          containerStyle={styles.inputContainer}
                          onChangeText={(text) => changeQuantity(text, index)}
                        />
                        <Input
                          style={styles.input}
                          placeholder="Bonus"
                          containerStyle={styles.inputContainer}
                          onChangeText={(text) => changeBonus(text, index)}
                        />
                      </View>
                      <View style={styles.smallRow}>
                        <Input
                          style={styles.input}
                          placeholder="Expiry Date DD/MM/YYYY (Optional)"
                          onChangeText={(text) => changeExpiryDate(text, index)}
                          containerStyle={styles.inputContainer}
                        />
                        <Input
                          style={styles.input}
                          placeholder="Cost Price"
                          onChangeText={(text) => changeCostPrice(text, index)}
                          containerStyle={styles.inputContainer}
                          defaultValue={item.costPrice.toString()}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        width: "25%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.touchable}
                        onPress={() => removeItem(index)}
                      >
                        <MaterialIcons
                          name="delete-sweep"
                          size={globalWidth("2%")}
                          color="#ff0055"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </View>

          <View style={styles.contentView}>
            {newOrder.length > 0 &&
              newOrder.map((item, index) => {
                return (
                  <View style={styles.listItemContainer}>
                    <Text style={[styles.number, { width: "30%" }]}>
                      {index + 1} ) {item.itemName}
                    </Text>
                    <Text
                      style={[styles.listItemText, { width: `${90 / 3}%` }]}
                    >
                      {" "}
                      {numberWithComa(item.quantity)}{" "}
                    </Text>
                    <Text
                      style={[styles.listItemText, { width: `${90 / 3}%` }]}
                    >
                      {" "}
                      {numberWithComa(item.totalQuantity)}{" "}
                    </Text>
                    <Text
                      style={[styles.listItemText, { width: `${90 / 3}%` }]}
                    >
                      {" "}
                      {numberWithComa(
                        parseFloat(item.totalValue).toFixed(2)
                      )}{" "}
                    </Text>
                  </View>
                );
              })}
            <Button
              buttonStyle={styles.submitBtn}
              titleStyle={styles.submitText}
              title="Submit"
              onPress={onSubmit}
              loading={submitIsLoading}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {},
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1.5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: globalWidth("1%"),
    marginVertical: globalHeight("0.25%"),
  },
  contentView: {
    width: "48%",
    padding: globalWidth("1%"),
    height: "100%",
  },
  select: {
    borderRadius: 10,
    height: globalHeight("5%"),
    cursor: "pointer",
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    width: "85%",
  },
  optionText: {
    fontSize: globalWidth("1%"),
    color: "black",
    fontFamily: "Poppins-Regular",
    lineHeight: globalHeight("2%"),
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("1%"),
  },
  input: {
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    width: "45%",
  },
  inputContainer: {
    width: "45%",
  },
  headerView: {
    width: "50%",
    alignSelf: "flex-start",
    padding: globalWidth("1%"),
    marginTop: globalHeight("1%"),
  },
  button: {
    backgroundColor: "transparent",
    width: "40%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontFamily: "Poppins-Regular",
  },
  listItemContainer: {
    width: "98%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    marginBottom: globalHeight("1%"),
    paddingBottom: globalHeight("1%"),
  },
  number: {
    fontFamily: "numbers",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  listItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: globalWidth("1%"),
    color: Colors.font,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    width: "45%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: globalHeight("1%"),
  },
  submitText: {
    fontSize: globalWidth("1%"),
    fontFamily: "Poppins-Regular",
  },
});

export default OrdersCreation;
