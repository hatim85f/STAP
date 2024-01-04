import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import AnimatedChevron from "../../components/AnimatedChevron";

const LeftMenu = (props) => {
  const { getDirection } = props;

  const [selectedMenu, setSelectedMenu] = useState("");
  const [subMenu, setSubMenu] = useState("");

  const animatedMaxHeightTeam = useRef(new Animated.Value(0)).current;
  const animatedMaxHeightIndividual = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedMenu === "team") {
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
    } else if (selectedMenu === "individual") {
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

  useEffect(() => {
    getDirection(subMenu);
  }, [subMenu]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.content, { maxHeight: animatedMaxHeightTeam }]}
      >
        <TouchableOpacity
          onPress={() =>
            setSelectedMenu(selectedMenu === "team" ? null : "team")
          }
          style={styles.smallContainer}
        >
          <Text style={styles.text}>Businesses</Text>
          <AnimatedChevron isOpen={selectedMenu === "team"} />
        </TouchableOpacity>
        {selectedMenu === "team" && (
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={() => setSubMenu("team-overview")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "team-overview" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "team-overview" ? "white" : Colors.primary,
                  },
                ]}
              >
                Total Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("team-monthly")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "team-monthly" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "team-monthly" ? "white" : Colors.primary,
                  },
                ]}
              >
                Monthly Achievement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("team-ytd")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor: subMenu === "team-ytd" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color: subMenu === "team-ytd" ? "white" : Colors.primary,
                  },
                ]}
              >
                YTD Achievement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("team-full-year")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "team-full-year" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "team-full-year" ? "white" : Colors.primary,
                  },
                ]}
              >
                Full Year Achievement
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
            setSelectedMenu(selectedMenu === "individual" ? null : "individual")
          }
          style={styles.smallContainer}
        >
          <Text style={styles.text}>Individuals</Text>
          <AnimatedChevron isOpen={selectedMenu === "individual"} />
        </TouchableOpacity>
        {selectedMenu === "individual" && (
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              onPress={() => setSubMenu("individual-overview")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "individual-overview" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "individual-overview"
                        ? "white"
                        : Colors.primary,
                  },
                ]}
              >
                Total Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("individual-monthly")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "individual-monthly" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "individual-monthly"
                        ? "white"
                        : Colors.primary,
                  },
                ]}
              >
                Monthly Achievement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("individual-ytd")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "individual-ytd" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "individual-ytd" ? "white" : Colors.primary,
                  },
                ]}
              >
                YTD Achievement
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSubMenu("individual-full-year")}
              style={[
                styles.lowerTextContainer,
                {
                  backgroundColor:
                    subMenu === "individual-full-year" ? "skyblue" : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.lowerText,
                  {
                    color:
                      subMenu === "individual-full-year"
                        ? "white"
                        : Colors.primary,
                  },
                ]}
              >
                Full Year Achievement
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

export default LeftMenu;
