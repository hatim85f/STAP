import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  FontAwesome5,
  Foundation,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const TabBarNavigator = (props) => {
  const [selectedRoute, setSelectedRoute] = useState(props.route);

  const changeRoute = (route) => {
    setSelectedRoute(route);

    window.location.href = `/team/${route}/`;
  };
  return (
    <Card style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => changeRoute("team-details")}
          style={styles.touchable}
        >
          <FontAwesome5
            name="people-carry"
            size={globalWidth("2%")}
            color={
              selectedRoute === "team-details" ? "#ff0055" : Colors.primary
            }
          />
        </TouchableOpacity>
        {selectedRoute === "team-details" && (
          <Text style={styles.routeName}>Team</Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => changeRoute("individual-target")}
          style={styles.touchable}
        >
          <Foundation
            name="target-two"
            size={globalWidth("2%")}
            color={
              selectedRoute === "individual-target" ? "#ff0055" : Colors.primary
            }
          />
        </TouchableOpacity>
        {selectedRoute === "individual-target" && (
          <Text style={styles.routeName}>Tasks</Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => changeRoute("individual-sales")}
          style={styles.touchable}
        >
          <MaterialIcons
            name="attach-money"
            size={globalWidth("2%")}
            color={
              selectedRoute === "individual-sales" ? "#ff0055" : Colors.primary
            }
          />
        </TouchableOpacity>
        {selectedRoute === "individual-sales" && (
          <Text style={styles.routeName}>Calendar</Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => changeRoute("individual-achievement")}
          style={styles.touchable}
        >
          <AntDesign
            name="barschart"
            size={globalWidth("2%")}
            color={
              selectedRoute === "individual-achievement"
                ? "#ff0055"
                : Colors.primary
            }
          />
        </TouchableOpacity>
        {selectedRoute === "individual-achievement" && (
          <Text style={styles.routeName}>Settings</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: globalHeight("7.5%"),
    width: globalWidth("50%"),
    alignSelf: "center",
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

export const TabBarNavigatorOptions = (navData) => {
  return {
    headerTitle: "TabBarNavigator",
  };
};

export default TabBarNavigator;
