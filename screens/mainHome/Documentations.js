import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  FlatList,
  ScrollView,
} from "react-native";
import { Octicons, SimpleLineIcons } from "@expo/vector-icons";
import Chevron from "../../components/Chevron";
import Colors from "../../constants/Colors";
import { isWeb, isPhone, isTablet } from "../../constants/device";
import { globalHeight } from "../../constants/globalWidth";
import data from "../../data/documentation";
import { Input } from "react-native-elements";

const Documentation = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const animatedMaxHeight = useRef(new Animated.Value(0)).current;

  const [searchText, setSearchText] = useState("");

  const renderContent = (steps) => {
    return (
      <ScrollView>
        {steps.map(({ step, details }, j) => (
          <View key={j} style={styles.contentItem}>
            <Text style={styles.step}>{step}</Text>
            {details.map((detail, k) => (
              <View style={styles.listItem} key={k}>
                <Octicons name="dot-fill" size={20} color="black" />
                <Text style={styles.detail}>{detail}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };

  const mainRef = useRef(null);

  useEffect(() => {
    if (selectedIndex !== null) {
      // Expand the content
      Animated.timing(animatedMaxHeight, {
        toValue: 1000, // Set an appropriate maximum height
        duration: 300, // Adjust the duration as needed
        useNativeDriver: false, // Make sure to set this to false when animating height
      }).start();
    } else {
      // Collapse the content
      Animated.timing(animatedMaxHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedIndex]);

  useEffect(() => {
    // if search text.length === 0 then set selected index to null
    // don't change selected index if text.length < 4
    const dataIndex = data.findIndex(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (dataIndex !== -1 && searchText.length >= 4) {
      setSelectedIndex(dataIndex);
    } else {
      setSelectedIndex(null);
    }
  }, [searchText]);
  return (
    <View style={styles.mainPageRow}>
      {isWeb() && (
        <View
          style={[
            styles.sideBar,
            {
              height:
                selectedIndex !== null
                  ? globalHeight("120%") + 300
                  : globalHeight("120%"),
            },
          ]}
        >
          {data.map(({ name }, i) => (
            <Pressable
              key={i}
              onPress={() => setSelectedIndex(i === selectedIndex ? null : i)}
              style={{
                padding: 10,
                marginVertical: 5,
              }}
            >
              <Text
                style={{
                  color: selectedIndex === i ? "white" : Colors.font,
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "headers",
                }}
              >
                {name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      <View
        style={[
          styles.container,
          { maxHeight: selectedIndex === null ? 0 : undefined },
        ]}
        ref={mainRef}
      >
        <Text
          style={[
            styles.headerText,
            {
              textAlign: "center",
              margin: 10,
              color: Colors.font,
              fontSize: isWeb() ? 25 : 15,
              fontStyle: "italic",
            },
          ]}
        >
          Getting Started with STAP™ (Sales Team Assistant PRO)
        </Text>
        {!isWeb() && (
          <View style={styles.searchContainer}>
            {/* // will perfrom search here checking if search text includes name
             */}
            <Input
              placeholder="Search"
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              style={styles.searchBar}
              rightIcon={() => (
                <SimpleLineIcons name="magnifier" size={24} color="black" />
              )}
            />
          </View>
        )}
        {data.map(({ name, route, steps }, i) => (
          <View key={i} style={styles.header}>
            <View style={styles.headerTouchable}>
              <Text
                style={[
                  styles.headerText,
                  {
                    textDecorationLine:
                      selectedIndex === i ? "underline" : "none",
                    textDecorationStyle: "solid",
                    textDecorationColor: Colors.primary,
                  },
                ]}
              >
                {name}
              </Text>
              <Chevron
                open={i === selectedIndex}
                close={selectedIndex === null || selectedIndex !== i}
                setIndex={() =>
                  setSelectedIndex(selectedIndex === i ? null : i)
                }
                nextAnimation={() => mainRef.current}
              />
            </View>
            {i === selectedIndex && (
              <Animated.View
                style={[styles.content, { maxHeight: animatedMaxHeight }]}
              >
                <Text style={styles.route}>{route}</Text>
                {renderContent(steps)}
              </Animated.View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainPageRow: {
    flexDirection: "row",
    backgroundColor: "#eee",
    height: globalHeight("100%"),
    overflow: "scroll",
    // hide scroll indicator
    scrollbarWidth: "none",
  },
  sideBar: {
    flex: isWeb() ? 0.25 : 0,
    backgroundColor: "#ccc",
    borderRightWidth: 2,
    borderColor: Colors.primary,
  },
  container: {
    flex: isWeb() ? 0.8 : 1,
    flexGrow: 1,
  },
  header: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
    width: isWeb() ? "45%" : "90%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  headerTouchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "headers",
  },
  route: {
    marginVertical: 5,
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
    padding: 10,
    overflow: "hidden",
  },
  contentItem: {
    marginBottom: 20,
  },
  step: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  detail: {
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  searchBar: {
    fontSize: 20,
    fontFamily: "headers",
    color: Colors.font,
  },
});

export const documentationOptions = (navData) => {
  return {
    headerTitle: "Documentation",
    headerStyle: {
      backgroundColor: "rgba(135, 0, 243, 0.18)",
      height: 100,
    },
    headerTintColor: Colors.font,
    headerTitleStyle: {
      fontSize: 22,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "headers",
    },
    headerLeft: () => {
      return (
        <Pressable
          onPress={() => {
            navData.navigation.navigate("Login");
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
        </Pressable>
      );
    },
  };
};

export default Documentation;
