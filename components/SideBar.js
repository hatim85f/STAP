import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Easing,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import { Animated } from "react-native";

import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const SideBar = (props) => {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const slogans = [
    "Manage Sales",
    "Set Targets",
    "Track Profit and Loss",
    "Optimize Team Performance",
    "Organize Customer Data",
    "Effective CRM",
    "Streamline Ordering",
    "Efficient Billing",
  ];

  const imageSources = [
    require("../assets/banner_image.jpg"),
    require("../assets/banner_image2.jpg"),
    require("../assets/banner_image3.jpg"),
    require("../assets/banner_image4.jpg"),
    // Add more image sources as needed
  ];

  console.log("globalWidth", globalWidth("20%"));

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(translateY, {
        toValue: -20,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        translateY.setValue(20);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSloganIndex, slogans]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out the current image
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // Animation duration for fade-out
        useNativeDriver: false,
      }).start(() => {
        // Change the image
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % imageSources.length
        );
        // Reset opacity for fade-in
        opacity.setValue(1);
        // Fade in the new image
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500, // Animation duration for fade-in
          useNativeDriver: false,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex, imageSources]);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.imageStyle}
        />
        <Text style={styles.title}>Sales Team Assistant Pro</Text>
        <Animated.Image
          source={imageSources[currentImageIndex]}
          style={[styles.imageBanner, { opacity }]}
        />
        <View style={styles.banner}>
          <Animated.Text
            style={[styles.bannerText, { transform: [{ translateY }] }]}
          >
            {slogans[currentSloganIndex]}
          </Animated.Text>
        </View>

        <View style={styles.lowerContainer}>
          <View style={styles.codexLogoContainer}>
            <Image
              source={require("../assets/codex_logo.png")}
              style={styles.codexLogo}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Powered by Codex</Text>
            <Text style={styles.text}>Innovations</Text>
          </View>
        </View>
        <Text style={styles.details}>For More Details </Text>
        <View style={styles.smallRow}>
          <FontAwesome name="phone" size={24} color={Colors.primary} />
          <Text style={styles.detailsText}>+971 56 145 2526</Text>
        </View>
        <View style={styles.smallRow}>
          <Entypo name="email" size={24} color={Colors.primary} />
          <Text style={styles.detailsText}>info@codexpandit.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: globalWidth("30%"),
    right: globalWidth("5%"),
    position: "absolute",
    top: 0,
    right: globalWidth("5%"),
    width: 300, // Adjust width based on your design
    backgroundColor: "#fff", // Sidebar background color
    padding: 20,
    borderColor: Colors.font,
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  imageStyle: {
    width: globalWidth("6%"),
    height: globalWidth("6%"),
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    // Add styling for the title
  },
  ctaButton: {
    backgroundColor: "#4CAF50", // Button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    // Add additional styling properties as needed
  },
  ctaText: {
    color: "#fff", // Button text color
    textAlign: "center",
    fontWeight: "bold",
    // Add styling for the CTA text
  },
  banner: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  bannerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  lowerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  codexLogoContainer: {
    alignItems: "center",
  },
  codexLogo: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    alignSelf: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "open-sans-bold",
    fontStyle: "italic",
    lineHeight: globalHeight("3%"),
  },
  details: {
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontFamily: "open-sans-bold",
    lineHeight: globalHeight("3%"),
    marginTop: globalHeight("2%"),
    textAlign: "center",
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: globalHeight("1%"),
  },
  detailsText: {
    fontSize: globalWidth("1%"),
    color: Colors.font,
    fontFamily: "open-sans-bold",
    lineHeight: globalHeight("3%"),
  },
  imageBanner: {
    width: globalWidth("12%"),
    height: globalWidth("10%"),
    alignSelf: "center",
    borderRadius: 10,
  },
});

export const SideBarOptions = (navData) => {
  return {
    headerTitle: "SideBar",
  };
};

export default SideBar;
