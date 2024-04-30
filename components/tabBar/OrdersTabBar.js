import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  FontAwesome5,
  Entypo,
  Foundation,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const OrdersTabBar = (props) => {
  const [selectedRoute, setSelectedRoute] = useState(props.route);

  const changeRoute = (route) => {
    setSelectedRoute(route);

    window.location.href = `/ordering/${route}/`;
  };

  return (
    <View style={[styles.barContainer, { flex: props.flex }]}>
      <Card style={[styles.container]}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => changeRoute("order_creation")}
            style={styles.touchable}
          >
            <FontAwesome5
              name="cash-register"
              size={globalWidth("2%")}
              color={
                selectedRoute === "order-creation" ? "#ff0055" : Colors.primary
              }
            />
          </TouchableOpacity>
          {selectedRoute === "order-creation" && (
            <Text style={styles.routeName}>Create</Text>
          )}
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => changeRoute("orders_show")}
            style={styles.touchable}
          >
            <Entypo
              name="list"
              size={globalWidth("2%")}
              color={
                selectedRoute === "orders_show" ? "#ff0055" : Colors.primary
              }
            />
          </TouchableOpacity>
          {selectedRoute === "orders_show" && (
            <Text style={styles.routeName}>List</Text>
          )}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    // flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: globalHeight("7.5%"),
    width: globalWidth("50%"),
    alignSelf: "center",
    bottom: 5,
  },
  touchable: {
    cursor: "pointer",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  routeName: {
    color: Colors.accent,
  },
});

export default OrdersTabBar;
