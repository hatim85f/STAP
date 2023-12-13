import React, { useState, useEffect } from "react";
import { Image, Modal, Pressable, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet } from "../../constants/device";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native";
import TableComp from "../../components/TableComp";
import numberWithComa from "../../components/helpers/numberWithComa";
import * as ordersActions from "../../store/orders/ordersActions";
import Loader from "../../components/Loader";

const RevisionModal = (props) => {
  const {
    reviseOrder,
    client,
    orderList,
    cancelRevision,
    orderId,
    clearOrder,
  } = props;

  const [tableDetails, setTableDetails] = useState([]);
  const [totalValue, setTotalValue] = useState(null);
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tabletails = orderList.map((order, index) => {
      const totalQuantity =
        order.bonusType === "Percentage"
          ? order.quantity + (order.quantity * order.bonusValue) / 100
          : order.quantity;

      const totalValue =
        order.bonusType === "Value"
          ? order.total - order.bonusValue
          : order.total;
      return [
        index + 1,
        order.productName,
        order.price + " " + order.currency,
        numberWithComa(parseFloat(order.quantity).toFixed(0)),
        order.bonusType === "Percentage"
          ? order.bonusValue + "%"
          : order.bonusValue + " " + order.currency,
        totalQuantity,
        numberWithComa(parseFloat(totalValue).toFixed(0)),
      ];
    });

    setTableDetails(tabletails);

    const totals = orderList.map((order) => {
      const totalValue =
        order.bonusType === "Value"
          ? (order.total - order.bonusValue).toFixed(0)
          : order.total;
      return totalValue;
    });

    setValues(totals);
  }, [orderList]);

  const header = [
    "#",
    "Product",
    "Price",
    "Quantity",
    "Bonus",
    "Total",
    "Value",
  ];

  const widthArr = [
    globalWidth("2.5%"),
    globalWidth("10%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6.5%"),
  ];

  useEffect(() => {
    const total = values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    setTotalValue(total);
  }, [tableDetails]);

  const dispatch = useDispatch();

  const confirmRevision = () => {
    setIsLoading(true);
    orderList.map((item) => {
      dispatch(
        ordersActions.addOrder(
          orderId,
          item.productId,
          item.quantity,
          item.bonusType === "Percentage"
            ? (item.quantity * item.bonusValue) / 100
            : item.quantity,
          item.bonusType === "Value" ? "Fixed" : "Percentage",
          item.bonusType === "Value"
            ? 0
            : (item.quantity * item.bonusValue) / 100,
          item.price,
          item.total,
          item.businessId
        )
      );
    });
    setIsLoading(false);
    cancelRevision();
    clearOrder();
  };

  if (isLoading) {
    return <Loader loadingMessage="Adding Order..." />;
  }

  return (
    <View style={styles.container}>
      {client && (
        <View style={styles.orderDetails}>
          <Image source={{ uri: client.logoURL }} style={styles.avatarStyle} />
          <Text style={styles.header}>
            Order Details for {client.clientName}
          </Text>
        </View>
      )}
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        {tableDetails.length > 0 && (
          <View style={{ width: globalWidth("98%"), alignSelf: "center" }}>
            <TableComp
              widthArr={widthArr}
              tableHead={header}
              data={tableDetails}
              showTotal
              totalData={[
                "",
                "Total",
                "",
                "",
                "",
                "",
                numberWithComa(totalValue.toFixed(0)),
              ]}
            />
          </View>
        )}
        <Button
          title="Confirm Revision"
          onPress={confirmRevision}
          buttonStyle={styles.button}
          titleStyle={styles.title}
        />

        <View style={{ height: globalHeight("15%") }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingTop: 20,
  },
  header: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    marginTop: 20,
    color: Colors.primary,
    marginBottom: globalHeight("2%"),
  },
  closeContainer: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 20,
    width: globalWidth("12%"),
  },
  orderDetails: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarStyle: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    height: globalWidth("7.5%"),
    width: globalWidth("7.5%"),
    borderRadius: globalWidth("3.75%"),
  },
  button: {
    width: "60%",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
  },
});

export const RevisionModalOptions = (navData) => {
  return {
    headerTitle: "RevisionModal",
  };
};

export default RevisionModal;
