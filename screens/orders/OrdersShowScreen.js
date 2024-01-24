import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import * as ordersActions from "../../store/orders/ordersActions";
import * as authActions from "../../store/auth/authActions";

import Loader from "../../components/Loader";
import Card from "../../components/Card";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import numberWithComa from "../../components/helpers/numberWithComa";
import DateRangePicker from "../../components/DateRangePicker";

import moment from "moment";
import OrdersTabBar from "../../components/tabBar/OrdersTabBar";

const OrdersShowScreen = (props) => {
  const { orders } = useSelector((state) => state.orders);

  // =============================================STATE MANAGEMENT=======================================

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [ordersList, setOrdersList] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalValue, settotalValue] = useState(0);

  // returning user back in if he refreshes the page
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
          dispatch(authActions.getUserIn(parsedUserDetails));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  // ==============================================GETTING ORDERS========================================

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate && endDate) {
      setIsLoading(true);
      setLoadingMessage("Getting Orders");
      dispatch(ordersActions.getOrders(startDate, endDate)).then(() => {
        setIsLoading(false);
        setLoadingMessage("");
        setOrdersList(orders?.sort((a, b) => a.timeStamp - b.timeStamp));
      });
    }
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const totalValue = orders.reduce((acc, item) => {
        return acc + item.totalValue;
      }, 0);

      settotalValue(totalValue);
    }
  });

  const deleteOrder = (orderId) => {
    setIsLoading(true);
    setLoadingMessage("Deleting Order");
    dispatch(ordersActions.deleteOrder(orderId, startDate, endDate)).then(
      () => {
        setIsLoading(false);
        setLoadingMessage("");
      }
    );
  };

  // =========================================RETURN JSX==============================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  if (!startDate || !endDate) {
    return (
      <View style={styles.container}>
        <MenuButton navigation={props.navigation} />
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Start Date:</Text>
            {startDate && (
              <Text style={styles.date}>
                {moment(startDate).format("DD/ MM/ YYYY")}
              </Text>
            )}
            <DateRangePicker getDate={(date) => setStartDate(date)} />
            <Text style={styles.title}>End Date:</Text>
            {endDate && (
              <Text style={styles.date}>
                {moment(endDate).format("DD/ MM/ YYYY")}
              </Text>
            )}
            <DateRangePicker getDate={(date) => setEndDate(date)} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.dates}>
              Please select a date range to view orders
            </Text>
          </View>
        </View>
        <OrdersTabBar navigation={props.navigation} route="orders-show" />
      </View>
    );
  }

  if (!orders || (orders.length === 0 && !startDate && !endDate)) {
    return (
      <View style={styles.container}>
        <MenuButton navigation={props.navigation} />
        <View style={styles.innerContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Start Date:</Text>
            {startDate && (
              <Text style={styles.date}>
                {moment(startDate).format("DD/ MM/ YYYY")}
              </Text>
            )}
            <DateRangePicker getDate={(date) => setStartDate(date)} />
            <Text style={styles.title}>End Date:</Text>
            {endDate && (
              <Text style={styles.date}>
                {moment(endDate).format("DD/ MM/ YYYY")}
              </Text>
            )}
            <DateRangePicker getDate={(date) => setEndDate(date)} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.dates}>
              No Orders Found From : {moment(startDate).format("DD/ MM/ YYYY")}{" "}
              To : {moment(endDate).format("DD/ MM/ YYYY")}
            </Text>
          </View>
        </View>
        <OrdersTabBar navigation={props.navigation} route="orders-show" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Start Date:</Text>
          {startDate && (
            <Text style={styles.date}>
              {moment(startDate).format("DD/ MM/ YYYY")}
            </Text>
          )}
          <DateRangePicker getDate={(date) => setStartDate(date)} />
          <Text style={styles.title}>End Date:</Text>
          {endDate && (
            <Text style={styles.date}>
              {moment(endDate).format("DD/ MM/ YYYY")}
            </Text>
          )}
          <DateRangePicker getDate={(date) => setEndDate(date)} />
          <Text style={styles.value}>
            Total Value : {numberWithComa(totalValue)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
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
              showsVerticalScrollIndicator={false}
              numColumns={2}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => {
                return (
                  <Card style={[styles.card]}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("single_order_details", {
                          details: item.details,
                          status: item.status,
                          startDate,
                          endDate,
                          order_id: item._id,
                        })
                      }
                      style={styles.clientInfo}
                    >
                      <Image
                        source={{ uri: item.client.logoURL }}
                        style={styles.avatarStyle}
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
                                  ? "skyblue"
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
                    <View style={styles.deleteContainer}>
                      <TouchableOpacity
                        onPress={() => deleteOrder(item._id)}
                        style={styles.touchable}
                      >
                        <MaterialIcons
                          name="delete-sweep"
                          size={globalWidth("2.5%")}
                          color="#ff0055"
                        />
                      </TouchableOpacity>
                    </View>
                  </Card>
                );
              }}
            />
          )}
        </View>
      </View>
      <OrdersTabBar navigation={props.navigation} route="orders-show" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  leftContainer: {
    width: globalWidth("20%"),
    backgroundColor: Colors.lightBG,
    alignItems: "center",
    borderRadius: 10,
    borderRightColor: Colors.primary,
    borderRightWidth: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 15,
  },
  title: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "header",
    color: Colors.primary,
    marginVertical: 10,
  },
  rightContainer: {
    flex: 1,
    width: globalWidth("75%"),
    alignItems: "center",
    borderRadius: 10,
    borderRightColor: Colors.primary,
    borderRightWidth: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: 15,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: globalHeight("0.5%"),
    width: globalWidth("37%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 5,
    marginLeft: globalWidth("1.5%"),
  },
  clientInfo: {
    width: "30%",

    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  clientName: {
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
    textAlign: "center",
    marginTop: globalHeight("1%"),
  },
  avatarStyle: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: globalWidth("2.5%"),
  },
  orderInfo: {
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
    textAlign: "center",
    lineHeight: globalHeight("3%"),
    color: Colors.primary,
  },
  data: {
    fontSize: globalWidth("1%"),
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
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
    color: Colors.font,
    width: globalWidth("80%"),
  },
  dates: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
    color: Colors.font,
    width: globalWidth("80%"),
    alignSelf: "center",
    marginTop: globalHeight("2.5%"),
  },
  dateData: {
    color: Colors.primary,
  },
  date: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "headers",
    textAlign: "center",
    lineHeight: globalHeight("3%"),
    color: Colors.font,
  },
  value: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "numbers",
    textAlign: "center",
    lineHeight: globalHeight("3%"),
    color: Colors.font,
    marginTop: globalHeight("2%"),
  },
  deleteContainer: {
    width: "5%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  touchable: {
    cursor: "pointer",
  },
});

export default OrdersShowScreen;
