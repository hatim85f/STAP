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
import PrintingComp from "./PrintingComp";

import { FontAwesome } from "@expo/vector-icons";

const RevisionModal = (props) => {
  const {
    client,
    orderList,
    cancelRevision,
    orderId,
    clearOrder,
    getVatStatus,
  } = props;

  const [tableDetails, setTableDetails] = useState([]);
  const [totalValue, setTotalValue] = useState(null);
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showingPrint, setshowingPrint] = useState(false);
  const [addVAT, setAddVAT] = useState(false);

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
        numberWithComa(
          parseFloat(addVAT ? totalValue * 1.05 : totalValue).toFixed(0)
        ),
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
  }, [orderList, addVAT]);

  useEffect(() => {
    getVatStatus(addVAT);
  }, [addVAT]);

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
    let finalTotal = total;

    if (addVAT) {
      finalTotal = total * 1.05;
    }
    setTotalValue(finalTotal);
  }, [tableDetails, addVAT]);

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
            : item.bonusValue,
          item.bonusType === "Value" ? "Fixed" : "Percentage",
          item.bonusType === "Value"
            ? 0
            : (item.quantity * item.bonusValue) / 100,
          item.price,
          addVAT ? item.total * 1.05 : item.total,
          item.businessId
        )
      );
    });
    setIsLoading(false);
    cancelRevision();
    clearOrder();
  };

  const addingVAT = () => {
    setAddVAT(!addVAT);
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
      <TouchableOpacity
        style={styles.press}
        onPress={() => setshowingPrint(true)}
      >
        <FontAwesome
          name="print"
          size={globalWidth("2%")}
          color={Colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={addingVAT} style={styles.middlePress}>
        {addVAT ? (
          <Text style={{ color: Colors.primary, textAlign: "center" }}>
            Cancel Added
          </Text>
        ) : (
          <Text style={{ color: Colors.primary, textAlign: "center" }}>
            Add VAT
          </Text>
        )}
      </TouchableOpacity>
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

        <View style={{ height: globalHeight("30%") }}></View>
      </ScrollView>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <PrintingComp
          tableDetails={tableDetails}
          totalValue={totalValue}
          tableHead={header}
          showPrint={showingPrint}
          cancelPrint={() => setshowingPrint(false)}
          orderNumber={orderId}
          client={client}
          addVAT={addVAT}
        />
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
  press: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    alignSelf: "flex-end",
  },
  middlePress: {
    alignSelf: "center",
    marginTop: globalHeight("2%"),
    width: globalWidth("20%"),
    height: globalWidth("2%"),
    alignItems: "center",
  },
});

export const RevisionModalOptions = (navData) => {
  return {
    headerTitle: "RevisionModal",
  };
};

export default RevisionModal;
