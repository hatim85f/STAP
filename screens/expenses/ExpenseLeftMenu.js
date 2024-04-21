import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import AnimatedChevron from "../../components/AnimatedChevron";

const ExpenseLeftMenu = (props) => {
  const { getDirection } = props;

  const [selectedMenu, setSelectedMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");

  const animatedMaxHeightTeam = useRef(new Animated.Value(0)).current;
  const animatedMaxHeightIndividual = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getDirection(subMenu);
  }, [subMenu]);

  useEffect(() => {
    if (selectedMenu === "add") {
      // Expand the content for team menu
      Animated.timing(animatedMaxHeightTeam, {
        toValue: globalHeight("20%"),
        duration: 300,
        useNativeDriver: false,
      }).start();
      // Collapse the content for individual menu
      Animated.timing(animatedMaxHeightIndividual, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (selectedMenu === "manage") {
      // Expand the content for individual menu
      Animated.timing(animatedMaxHeightIndividual, {
        toValue: globalHeight("20%"),
        duration: 300,
        useNativeDriver: false,
      }).start();
      // Collapse the content for team menu
      Animated.timing(animatedMaxHeightTeam, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Collapse the content for both menus if nothing is selected
      Animated.timing(animatedMaxHeightTeam, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(animatedMaxHeightIndividual, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedMenu]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.content, { maxHeight: animatedMaxHeightTeam }]}
      >
        <TouchableOpacity
          onPress={() => setSelectedMenu(selectedMenu === "add" ? null : "add")}
          style={styles.smallContainer}
        >
          <Text style={styles.text}>Add Expenses</Text>
          <AnimatedChevron isOpen={selectedMenu === "add"} />
        </TouchableOpacity>
        {selectedMenu === "add" && (
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={() => setSubMenu("add-fixed")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "add-fixed" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color: subMenu === "add-fixed" ? "white" : Colors.primary,
                  },
                ]}
              >
                Fixed Expenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("add-variable")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "add-variable" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "add-variable" ? "white" : Colors.primary,
                  },
                ]}
              >
                Variable Expenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("add-marketing")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "add-marketing" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "add-marketing" ? "white" : Colors.primary,
                  },
                ]}
              >
                Marketing Expenses
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      <Animated.View
        style={[styles.content, { maxHeight: animatedMaxHeightIndividual }]}
      >
        <TouchableOpacity
          onPress={() =>
            setSelectedMenu(selectedMenu === "manage" ? null : "manage")
          }
          style={styles.smallContainer}
        >
          <Text style={styles.text}>Manage Expenses</Text>
          <AnimatedChevron isOpen={selectedMenu === "manage"} />
        </TouchableOpacity>
        {selectedMenu === "manage" && (
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={() => setSubMenu("manage-fixed")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "manage-fixed" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "manage-fixed" ? "white" : Colors.primary,
                  },
                ]}
              >
                Fixed Expenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("manage-variable")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "manage-variable" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "manage-variable" ? "white" : Colors.primary,
                  },
                ]}
              >
                Variable Expenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("manage-marketing")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "manage-marketing" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "manage-marketing" ? "white" : Colors.primary,
                  },
                ]}
              >
                Marketing Expenses
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "98%",
  },
  smallContainer: {
    width: "100%",
    height: globalHeight("5%"),
    backgroundColor: Colors.lightBG,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: globalWidth("0.5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: globalHeight("2%"),
    color: Colors.font,
    fontFamily: "HelveticaNeue",
    fontStyle: "italic",
  },
  content: {
    flexGrow: 1,
    padding: 10,
    overflow: "hidden",
    minHeight: globalHeight("6%"),
  },
  lowerContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  lowerTextContainer: {
    height: globalHeight("3.5%"),
    justifyContent: "center",
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
  },
  lowerText: {
    fontFamily: "numbers",
    fontSize: globalHeight("1.6%"),
    color: Colors.primary,
    marginLeft: globalWidth("2.5%"),
  },
});

export default ExpenseLeftMenu;
