import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import * as ordersActions from "../../store/orders/ordersActions";
import numberWithComma from "../../components/helpers/numberWithComa";

const EditProductOrder = (props) => {
  const { product, close, startDate, endDate } = props;

  const [newProductPrice, setnewProductPrice] = useState(null);
  const [newQuantity, setNewQuantity] = useState(null);
  const [newDiscount, setNewDiscount] = useState(null);
  const [newDiscountType, setNewDiscountType] = useState(null);
  const [newBonusUnits, setNewBonusUnits] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      const bonus =
        product.discountType === "Percentage"
          ? ((product.bonusUnits / product.quantity) * 100).toFixed(0)
          : product.bonusUnits;

      const bonusQuantity =
        product.discountType === "Percentage"
          ? ((product.quantity * bonus) / 100).toFixed(0)
          : product.bonusUnits;

      setnewProductPrice(product.productPrice);
      setNewQuantity(product.quantity);
      setNewDiscount(bonus);
      setNewDiscountType(product.discountType);
      setNewBonusUnits(bonusQuantity);
      setTotalValue(product.totalValue);
    }
  }, [product]);

  const dispatch = useDispatch();

  const editItem = () => {
    setIsLoading(true);
    dispatch(
      ordersActions.editItem(
        product.orderId,
        product.productId,
        +newQuantity,
        +newDiscount,
        newDiscountType,
        +newBonusUnits,
        +newProductPrice,
        parseInt(newProductPrice) * parseInt(newQuantity),
        product.businessId,
        product.mainOrderId,
        startDate,
        endDate
      )
    ).then(() => {
      setIsLoading(false);
      close();
    });
  };

  const changeItemBonus = useCallback(
    (bonus) => {
      const bonusQuantity =
        newDiscountType === "Percentage"
          ? ((newQuantity * bonus) / 100).toFixed(0)
          : bonus;

      const totalQuantity = bonus + newQuantity;

      setTotalQuantity(
        newDiscountType === "Percentage" ? totalQuantity : newQuantity
      );
      setNewBonusUnits(bonusQuantity);
      setNewDiscount(bonus);
    },
    [product, newDiscountType, newQuantity]
  );

  const changeQuantity = (quantity) => {
    setNewQuantity(quantity);
    const bonusQuantity =
      newDiscountType === "Percentage"
        ? ((quantity * newDiscount) / 100).toFixed(0)
        : newBonusUnits;

    setNewBonusUnits(bonusQuantity);
  };

  useEffect(() => {
    const newTotalValue = newProductPrice * newQuantity;

    let minusValue = 0;
    if (newDiscountType === "Fixed") {
      minusValue = parseInt(newBonusUnits);
    }
    const finalTotal = newTotalValue - minusValue;

    setTotalValue(finalTotal);
  }, [newProductPrice, newQuantity, newBonusUnits, newDiscountType]);

  return (
    <View style={styles.container}>
      {product && (
        <View style={styles.innerContainer}>
          <Text style={styles.productName}> {product.productNickName} </Text>
          <View style={styles.row}>
            <Input
              label="Product Price"
              value={newProductPrice?.toString()}
              onChangeText={(text) => setnewProductPrice(+text)}
              keyboardType="number-pad"
              containerStyle={styles.inputContainer}
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <Input
              label="Quantity"
              value={newQuantity?.toString()}
              onChangeText={(text) => changeQuantity(+text)}
              keyboardType="number-pad"
              containerStyle={styles.inputContainer}
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.row}>
            <Input
              label={
                newDiscountType === "Percentage" ? "Bonus %" : "Discount Value"
              }
              value={newDiscount?.toString()}
              onChangeText={(text) => changeItemBonus(+text)}
              keyboardType="number-pad"
              containerStyle={styles.inputContainer}
              style={styles.input}
              labelStyle={styles.labelStyle}
            />
            <Input
              label="Total Quantity"
              value={totalQuantity.toString()}
              keyboardType="number-pad"
              containerStyle={styles.inputContainer}
              style={styles.input}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.checkContainer}>
              <CheckBox
                checked={newDiscountType === "Percentage"}
                onPress={() => setNewDiscountType("Percentage")}
                checkedColor={Colors.primary}
              />
              <Text style={styles.title}> Percentage </Text>
            </View>
            <View style={styles.checkContainer}>
              <CheckBox
                checked={newDiscountType === "Fixed"}
                onPress={() => setNewDiscountType("Fixed")}
                checkedColor={Colors.primary}
              />
              <Text style={styles.title}> Value </Text>
            </View>
          </View>
          <Text style={styles.value}>
            Total Order Value: {numberWithComma(totalValue)}
          </Text>
          {isLoading ? (
            <View style={styles.activityContainer}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <Button
              title="Edit"
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              onPress={editItem}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "60%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    width: "40%",
  },
  input: {
    textAlign: "center",
    fontFamily: "numbers",
    color: Colors.font,
  },
  labelStyle: {
    textAlign: "center",
    color: Colors.primary,
  },
  checkContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: "headers",
    color: Colors.font,
    fontStyle: "italic",
  },
  productName: {
    textAlign: "center",
    fontFamily: "headers",
    color: Colors.primary,
    fontSize: globalWidth("3%"),
    marginBottom: globalHeight("3%"),
    fontWeight: "bold",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: "30%",
    alignSelf: "center",
    marginTop: globalHeight("8%"),
    borderRadius: 10,
  },
  activityContainer: {
    marginTop: globalHeight("8%"),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    textAlign: "center",
    fontFamily: "numbers",
    color: Colors.font,
    fontSize: globalWidth("1.5%"),
    marginBottom: globalHeight("3%"),
    marginTop: globalHeight("3%"),
  },
});

export default EditProductOrder;
