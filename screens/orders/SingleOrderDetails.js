import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import numberWithComa from "../../components/helpers/numberWithComa";

import BackArrow from "../../components/BackArrow";
import WebAlert from "../../components/webAlert/WebAlert";
import Card from "../../components/Card";
import OrdersTabBar from "../../components/tabBar/OrdersTabBar";
import Loader from "../../components/Loader";
import Colors from "../../constants/Colors";

import * as orderActions from "../../store/orders/ordersActions";
import EditProductOrder from "./EditProductOrder";

const SingleOrderDetails = (props) => {
  const { details, status, startDate, endDate, order_id } = props.route.params;

  const [totalValue, setTotalValue] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [changingStatus, setChangingStatus] = useState(false);

  const dispatch = useDispatch();

  // ================================ANIMATION=======================================

  const containerHeight = useRef(
    new Animated.Value(-globalHeight("100%"))
  ).current;
  const dropperHeight = useRef(new Animated.Value(-globalHeight(0))).current;

  const startAnimation = () => {
    Animated.timing(containerHeight, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  const closeAnimation = () => {
    Animated.timing(containerHeight, {
      toValue: globalHeight("20%"),
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      Animated.timing(containerHeight, {
        toValue: -globalHeight("100%"),
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.bounce,
      }).start();
    });
  };

  // ================================GETTING ORDERS VALUE=======================================

  useEffect(() => {
    const totalValue = details.reduce((acc, item) => {
      return acc + item.totalValue;
    }, 0);

    setTotalValue(totalValue);
  });

  // ======================================CONTROL EDIT CONTAINER======================================

  const closeData = () => {
    setSelectedProduct(null);
    closeAnimation();
  };

  // ================================== DELETE ITEM =======================================

  const consfirmDelete = () => {
    setShowAlert(false);
    setIsLoading(true);
    setLoadingMessage("Deleting Item");
    dispatch(orderActions.deleteItem(itemId, orderId));

    setIsLoading(false);
    props.navigation.goBack();
  };

  const deleteItem = (itemId, orderId) => {
    setShowAlert(true);
    setItemId(itemId);
    setOrderId(orderId);
  };

  // ================================== CHANGE STATUS =======================================

  const openDropper = () => {
    setChangingStatus(true);
    Animated.timing(dropperHeight, {
      toValue: globalHeight("20%"),
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const changeStatus = (status) => {
    setIsLoading(true);
    setLoadingMessage("Changing Status");
    dispatch(orderActions.changeOrderStatus(order_id, status)).then(() => {
      setIsLoading(false);
    });
    Animated.timing(dropperHeight, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setChangingStatus(false);
  };

  // ================================== RENDERING =======================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: globalWidth("100%"), alignItems: "flex-start" }}>
        <BackArrow navigation={props.navigation} />
      </View>
      {changingStatus && (
        <Animated.View style={[styles.dropper, { height: dropperHeight }]}>
          <TouchableOpacity onPress={() => changeStatus("In Progress")}>
            <Text style={styles.statusText}> In Progress </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeStatus("Completed")}>
            <Text style={styles.statusText}> Completed </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeStatus("Pending")}>
            <Text style={styles.statusText}> Pending </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {!changingStatus && (
        <TouchableOpacity onPress={openDropper}>
          <Text
            style={[
              styles.header,
              {
                color:
                  status === "Pending"
                    ? "orange"
                    : status === "In Progress"
                    ? "skyblue"
                    : status === "Completed"
                    ? "green"
                    : "red",
              },
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.number}>
        {" "}
        Order Value : {numberWithComa(totalValue ? +totalValue : 0)}{" "}
      </Text>

      {details && details.length > 0 && (
        <FlatList
          data={details}
          keyExtractor={(item) => item.productId}
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "column" }}>
                <View
                  style={[
                    styles.deleteContainer,
                    { width: "100%", marginTop: globalHeight("2%") },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      setSelectedProduct(item);
                      startAnimation();
                    }}
                  >
                    <Feather
                      name="edit"
                      size={globalWidth("2%")}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <Card style={styles.card}>
                  <View style={styles.leftContainer}>
                    <Image
                      source={{ uri: item.productImage }}
                      style={styles.avatarStlye}
                    />
                    <Text style={styles.itemName}> {item.productName} </Text>
                    <Text style={styles.category}>
                      {" "}
                      {item.productCategory}{" "}
                    </Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <View style={styles.dataContainer}>
                      <Text style={styles.title}>
                        {" "}
                        Product Price :{" "}
                        <Text style={styles.data}>
                          {numberWithComa(item.productPrice)}
                        </Text>{" "}
                      </Text>
                    </View>
                    <View style={styles.dataContainer}>
                      <Text style={styles.title}>
                        {" "}
                        Quantity:{" "}
                        <Text style={styles.data}>{item.quantity}</Text>{" "}
                      </Text>
                    </View>
                    <View style={styles.dataContainer}>
                      <Text style={styles.title}>
                        {" "}
                        Bonus:{" "}
                        <Text style={styles.data}>
                          {item.discountType === "Percentage"
                            ? (item.bonusUnits / item.quantity).toFixed(0) *
                                100 +
                              "%"
                            : item.bonusUnits}
                        </Text>{" "}
                      </Text>
                    </View>
                    <View style={styles.dataContainer}>
                      <Text style={styles.title}>
                        {" "}
                        Total Units:{" "}
                        <Text style={styles.data}>
                          {item.discountType === "Percentage"
                            ? numberWithComa(item.bonusUnits + item.quantity)
                            : item.quantity}
                        </Text>{" "}
                      </Text>
                    </View>
                    <View style={styles.dataContainer}>
                      <Text style={styles.title}>
                        {" "}
                        Total Value :{" "}
                        <Text style={styles.data}>
                          {numberWithComa(item.totalValue)}
                        </Text>{" "}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.deleteContainer}>
                    <TouchableOpacity
                      onPress={() => deleteItem(item.orderId, item.mainOrderId)}
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
              </View>
            );
          }}
        />
      )}
      <View style={{ height: globalHeight("10%") }} />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <OrdersTabBar navigation={props.navigation} route="orders_show" />
      </View>
      <WebAlert
        showAlert={showAlert}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        cancelText="Cancel"
        okText="Delete"
        onCancel={() => setShowAlert(false)}
        onOk={consfirmDelete}
      />
      <Animated.View
        style={[
          styles.editContainer,
          { transform: [{ translateY: containerHeight }] },
        ]}
      >
        <View
          style={{ alignItems: "flex-end", width: "90", alignSelf: "center" }}
        >
          <TouchableOpacity
            onPress={closeData}
            style={{ width: "100%", alignItems: "flex-end" }}
          >
            <AntDesign name="closesquareo" size={24} color="#ff0055" />
          </TouchableOpacity>
        </View>
        <EditProductOrder
          product={selectedProduct}
          close={closeData}
          startDate={startDate}
          endDate={endDate}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
  },
  number: {
    textAlign: "center",
    fontFamily: "numbers",
    color: Colors.font,
    fontSize: globalWidth("1.2%"),
    marginVertical: 10,
  },
  card: {
    borderWidth: 1.5,
    borderRadius: 10,
    flexDirection: "row",
    width: globalWidth("45%"),
    alignSelf: "center",
    marginBottom: globalHeight("0.5%"),
    marginLeft: globalWidth("1%"),
    alignSelf: "center",
  },
  leftContainer: {
    width: "35%",
    paddingVertical: 10,
    paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontFamily: "numbers",
    fontSize: globalWidth("1%"),
    textAlign: "center",
    color: Colors.primary,
    marginVertical: 5,
    marginTop: 10,
  },
  category: {
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    textAlign: "center",
    color: Colors.font,
    marginVertical: 5,
    fontStyle: "italic",
  },
  avatarStlye: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderRadius: globalWidth("2.5%"),
  },
  rightContainer: {
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  title: {
    fontFamily: "numbers",
    color: Colors.font,
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
  },
  data: {
    color: Colors.primary,
  },
  deleteContainer: {
    width: "10%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  touchable: {
    cursor: "pointer",
  },
  editContainer: {
    position: "absolute",
    bottom: globalHeight("3%"),
    width: "95%",
    height: "90%",
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.font,
    borderRadius: 10,
    alignSelf: "center",
    paddingTop: 10,
  },
  dropper: {
    width: globalWidth("20%"),
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 2.5,
    padding: 5,
    position: "absolute",
    top: globalHeight("5%"),
    zIndex: 1000,
  },
  statusText: {
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    marginVertical: globalHeight("1%"),
    textAlign: "center",
    color: Colors.primary,
  },
});

export default SingleOrderDetails;
