import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { isWeb } from "../../constants/device";
import { globalWidth } from "../../constants/globalWidth";

const DevelopersPage = () => {
  return (
    <View style={styles.container}>
      {/* Company Logo */}
      <Image
        source={require("../../assets/vectors/codex.png")}
        style={styles.logo}
      />

      <Text style={styles.pageTitle}>Developers - Codex Technology</Text>

      {/* Content */}
      <Text style={styles.content}>
        Codex Technology is the driving force behind STAP™ – your trusted
        partner in technology and business solutions.
      </Text>

      <Text style={styles.content}>
        Established in the UAE in 2023, Codex Technology has a proven track
        record of delivering innovative web and mobile app solutions to a wide
        range of businesses.
      </Text>

      <Text style={styles.content}>
        Our mission is to empower businesses by providing cutting-edge
        technologies that simplify operations, increase efficiency, and drive
        growth.
      </Text>

      <Text style={styles.content}>
        With STAP™, we've combined our technical expertise with our passion for
        helping businesses succeed. We believe that technology should be a
        catalyst for growth, and STAP™ is a testament to that belief.
      </Text>

      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Us:</Text>
        <Text style={styles.contactText}>Email: info@codexpandit.com</Text>
        <Text style={styles.contactText}>Website: www.codexpandit.com</Text>
        <Text style={styles.contactText}>WhatsApp: +971561452526</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingHorizontal: isWeb() ? globalWidth("20%") : globalWidth("5%"),
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.font,
    marginBottom: 20,
    fontFamily: "headers",
    fontStyle: "italic",
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "headers",
  },
  contactContainer: {
    width: "100%",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "headers",
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
});

export const developersPageOptions = (navData) => {
  return {
    headerTitle: "About Developers",
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
            navData.navigation.navigate("STAP™");
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

export default DevelopersPage;
