import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as ordersActions from "../../store/orders/ordersActions";

import Loader from "../../components/Loader";
import Card from "../../components/Card";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import moment from "moment";
import numberWithComa from "../../components/helpers/numberWithComa";
import DateRangePicker from "../../components/DateRangePicker";

const OrdersShowScreen = (props) => {
  const { orders } = useSelector((state) => state.orders);

  // =============================================STATE MANAGEMENT=======================================

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // ==============================================GETTING ORDERS========================================

  const dispatch = useDispatch();

  const getOrders = () => {
    setRefreshing(true);
    dispatch(ordersActions.getOrders(startDate, endDate)).then(() => {
      setRefreshing(false);
      setOrdersList(orders.sort((a, b) => a.timeStamp - b.timeStamp));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Orders");
    dispatch(ordersActions.getOrders(startDate, endDate)).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
      setOrdersList(orders?.sort((a, b) => a.timeStamp - b.timeStamp));
    });
  }, [dispatch, startDate, endDate]);

  const changeDate = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  console.log({ startDate, endDate, orders });

  // =========================================RETURN JSX==============================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  if (!startDate || !endDate) {
    return (
      <View style={styles.container}>
        <DateRangePicker getDate={(start, end) => changeDate(start, end)} />
        <View style={styles.noteContainer}>
          <Text style={styles.note}>
            Please select a date range to view orders
          </Text>
        </View>
      </View>
    );
  }

  if ((orders && orders.length === 0) || !orders) {
    return (
      <View style={styles.container}>
        <DateRangePicker getDate={(start, end) => changeDate(start, end)} />
        <View style={styles.noteContainer}>
          <Text style={styles.note}>No Orders Found</Text>
          <Text style={styles.note}>
            Please change date range to view orders
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DateRangePicker getDate={(start, end) => changeDate(start, end)} />
      <Text style={styles.dates}>
        From :{" "}
        <Text style={styles.dateData}>
          {moment(startDate).format("DD/ MM/ YYYY")}
        </Text>{" "}
        To :{" "}
        <Text style={styles.dateData}>
          {moment(endDate).format("DD/ MM/ YYYY")}
        </Text>
      </Text>
      {orders && orders.length > 0 && (
        <FlatList
          style={{ marginTop: globalHeight("2%") }}
          data={orders}
          refreshing={refreshing}
          onRefresh={() => {
            getOrders();
          }}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            return (
              <Card
                style={[
                  styles.card,
                  {
                    backgroundColor: index % 2 === 0 ? "#fff" : Colors.lightBG,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("single_order_details", {
                      details: item.details,
                      status: item.status,
                    })
                  }
                  style={styles.clientInfo}
                >
                  <Avatar
                    source={{ uri: item.client.logoURL }}
                    rounded
                    size={isTablet() ? globalWidth("10%") : globalWidth("15%")}
                    avatarStyle={styles.avatarStyle}
                  />
                  <Text style={styles.clientName}>
                    {item.client.clientName}
                  </Text>
                </TouchableOpacity>
                <View style={styles.orderInfo}>
                  <View style={styles.dataContainer}>
                    <Text style={styles.title}>Order Number</Text>
                    <Text style={styles.data}>{item._id}</Text>
                  </View>
                  <View style={styles.dataContainer}>
                    <Text style={styles.title}>Order Value</Text>
                    <Text style={styles.data}>
                      {" "}
                      {numberWithComa(item.totalValue)}
                    </Text>
                  </View>
                  <View style={styles.dataContainer}>
                    <Text style={styles.title}>Order Date</Text>
                    <Text style={styles.data}>
                      {moment(item.timeStamp).format("DD/MM/YYYY hh:mm A")}
                    </Text>
                  </View>

                  <View style={styles.dataContainer}>
                    <Text style={styles.title}>Order Status</Text>
                    <Text
                      style={[
                        styles.data,
                        {
                          color:
                            item.status === "Pending"
                              ? "orange"
                              : item.status === "In Progress"
                              ? Colors.font
                              : item.status === "Completed"
                              ? "green"
                              : "#ff0055",
                        },
                      ]}
                    >
                      {" "}
                      {item.status}{" "}
                    </Text>
                  </View>
                  <View
                    style={[styles.dataContainer, { borderBottomWidth: 0 }]}
                  >
                    <Text style={styles.title}>Submitted By</Text>
                    <Text style={styles.data}>{item.userName}</Text>
                    <Text style={styles.title}> {item.designation} </Text>
                  </View>
                </View>
              </Card>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: globalHeight("0.5%"),
    width: globalWidth("98%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 5,
  },
  clientInfo: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  clientName: {
    fontSize: isTablet() ? globalWidth("2%") : globalWidth("3.5%"),
    fontFamily: "headers",
    textAlign: "center",
  },
  avatarStyle: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  orderInfo: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: isTablet() ? globalWidth("2%") : globalWidth("3.5%"),
    fontFamily: "headers",
    textAlign: "center",
    lineHeight: globalHeight("3%"),
    color: Colors.primary,
  },
  data: {
    fontSize: isTablet() ? globalWidth("2%") : globalWidth("3.5%"),
    fontFamily: "headers",
    textAlign: "center",
    lineHeight: globalHeight("3%"),
    color: Colors.font,
  },
  dataContainer: {
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  noteContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    fontFamily: "headers",
    fontSize: isTablet() ? globalWidth("3%") : globalWidth("5%"),
    textAlign: "center",
    color: Colors.font,
    width: globalWidth("80%"),
  },
  dates: {
    fontFamily: "headers",
    fontSize: isTablet() ? globalWidth("3%") : globalWidth("5%"),
    textAlign: "center",
    color: Colors.font,
    width: globalWidth("80%"),
    alignSelf: "center",
    marginTop: globalHeight("2.5%"),
  },
  dateData: {
    color: Colors.primary,
  },
});

export default OrdersShowScreen;
