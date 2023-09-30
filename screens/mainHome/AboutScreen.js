import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isPhone, isTablet, isWeb } from "../../constants/device";

const AboutScreen = (props) => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/vectors/codex.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>About STAP™</Text>
        <Text style={styles.description}>
          STAP™ is an application powered by{" "}
          <Text
            style={styles.codex}
            onPress={() => openLink("https://www.codexpandit.com")}
          >
            Codex FZE
          </Text>
          , a technology company established in the UAE in 2023.{" "}
          <Text
            style={styles.codex}
            onPress={() => openLink("https://www.codexpandit.com")}
          >
            Codex FZE
          </Text>{" "}
          specializes in developing and creating websites and mobile apps as
          part of business solutions.
        </Text>
        <Text style={styles.description}>
          STAP™ is one of our business solutions technologies that facilitate
          the monitoring and performance of sales industries. It provides small
          business owners and team leaders, even in large companies, with the
          tools to manage and monitor their sales, sales team performance, sales
          profit, inventory, invoicing, and much more.
        </Text>
        <Text style={styles.description}>
          STAP™ will be free for the first 3 months and will then be available
          at very affordable prices for customers who love it and wish to
          continue using it. The application is known for its durability and
          user-friendly interface.
        </Text>
        <Text style={styles.description}>
          This is just the first stage, and in the future, more features and
          plans will be added.
        </Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.contact}>Contact Information:</Text>
        <TouchableOpacity
          onPress={() => openLink("mailto:info@codexpandit.com")}
        >
          <Text style={styles.link}>info@codexpandit.com (Company Email)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink("https://www.codexpandit.com")}
        >
          <Text style={styles.link}>www.codexpandit.com (Company Website)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink("https://wa.me/+971561452526")}
        >
          <Text style={styles.link}>+971561452526 (Company WhatsApp)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("mailto:info@stap-crm.com")}>
          <Text style={styles.link}>
            info@stap-crm.com (STAP Customer Service Email)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    width: isWeb() ? globalWidth("80%") : globalWidth("100%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "headers",
    color: Colors.font,
    fontStyle: "italic",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "headers",
    lineHeight: 25,
  },
  codex: {
    color: Colors.primary,
    textDecorationColor: Colors.primary,
    textDecorationLine: "underline",
    cursor: "pointer",
  },
  version: {
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    width: isWeb() ? globalWidth("15%") : globalWidth("40%"),
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  contact: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "headers",
    color: Colors.font,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
    fontFamily: "headers",
    cursor: "pointer",
  },
});

export const aboutScreenOptions = (navData) => {
  return {
    headerTitle: "About STAP™",
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
        <TouchableOpacity
          onPress={() => {
            navData.navigation.navigate("Login");
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      );
    },
  };
};

export default AboutScreen;
