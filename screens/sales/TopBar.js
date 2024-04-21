import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, FontAwesome5, AntDesign } from "@expo/vector-icons";

import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const TopBar = (props) => {
  const [routeName, setRouteName] = useState("");

  useEffect(() => {
    setRouteName(window.location.href.split("/")[4]);
  }, [window.location.href]);

  const changeRouteName = (route) => {
    setRouteName(route);
    if (routeName !== route) {
      window.location.href = `/sales/${route}/`;
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => changeRouteName("sales-upload")}
        style={styles.button}
      >
        <Entypo
          name="upload"
          size={globalWidth("2%")}
          color={routeName === "sales-upload" ? Colors.primary : Colors.lightBG}
        />
        <Text
          style={routeName === "sales-upload" ? styles.selected : styles.title}
        >
          Upload Sales
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeRouteName("manual-sales")}
        style={styles.button}
      >
        <Entypo
          name="add-to-list"
          size={globalWidth("2%")}
          color={routeName === "manual-sales" ? Colors.primary : Colors.lightBG}
        />
        <Text
          style={routeName === "manual-sales" ? styles.selected : styles.title}
        >
          Add Manually
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeRouteName("sales-show")}
        style={styles.button}
      >
        <AntDesign
          name="linechart"
          size={globalWidth("2%")}
          color={routeName === "sales-show" ? Colors.primary : Colors.lightBG}
        />
        <Text
          style={routeName === "sales-show" ? styles.selected : styles.title}
        >
          Sales Show
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeRouteName("contribute");
        }}
        style={styles.button}
      >
        <AntDesign
          name="team"
          size={globalWidth("2%")}
          color={routeName === "contribute" ? Colors.primary : Colors.lightBG}
        />
        <Text
          style={routeName === "contribute" ? styles.selected : styles.title}
        >
          Contribute
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: globalWidth("40%"),
    alignSelf: "center",
    marginTop: globalWidth("2%"),
    borderWidth: 2.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    padding: globalWidth("0.25%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
  },
  selected: {
    color: Colors.primary,
    fontSize: globalWidth("0.6%"),
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },
  title: {
    fontSize: globalWidth("0.6%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export const TopBarOptions = (navData) => {
  return {
    headerTitle: "TopBar",
  };
};

export default TopBar;
