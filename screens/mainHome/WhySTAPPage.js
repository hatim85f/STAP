import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
} from "react-native";
import Colors from "../../constants/Colors";
import { isPhone, isTablet, isWeb } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const WhySTAPPage = (props) => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Company Logo */}
      <Image
        source={require("../../assets/vectors/codex.png")}
        style={styles.logo}
      />

      <Text style={styles.pageTitle}>Why STAP™?</Text>

      {/* Content */}
      <Text style={styles.content}>
        STAP™ is more than just another sales management tool. It's a
        comprehensive solution designed to transform the way you manage and
        monitor your sales operations.
      </Text>

      {/* List of Reasons */}
      <View style={styles.reasonsContainer}>
        <Text style={styles.reasonTitle}>1. Streamlined Sales Management:</Text>
        <Text style={styles.reasonText}>
          STAP™ simplifies and streamlines the entire sales management process,
          from tracking leads to closing deals. Say goodbye to spreadsheets and
          manual record-keeping – with STAP™, everything is at your fingertips.
        </Text>

        <Text style={styles.reasonTitle}>
          2. Sales Team Performance Tracking:
        </Text>
        <Text style={styles.reasonText}>
          Monitor your sales team's performance effortlessly. STAP™ provides you
          with real-time insights into individual and team sales performance,
          helping you identify top performers and areas that need improvement.
        </Text>

        <Text style={styles.reasonTitle}>3. Inventory Management:</Text>
        <Text style={styles.reasonText}>
          Never run out of stock again. STAP™ offers robust inventory management
          features that allow you to track your products or services in
          real-time. Know when it's time to restock and avoid missed sales
          opportunities.
        </Text>

        <Text style={styles.reasonTitle}>4. Invoicing Made Easy:</Text>
        <Text style={styles.reasonText}>
          Create professional invoices with a few clicks. STAP™ generates
          invoices that you can send directly to your clients. It even supports
          multiple currencies, making it perfect for international business.
        </Text>

        <Text style={styles.reasonTitle}>5. Affordable Pricing:</Text>
        <Text style={styles.reasonText}>
          STAP™ understands the needs of small businesses and offers competitive
          pricing plans. Start with a 3-month free trial and continue with
          affordable pricing options that won't break the bank.
        </Text>

        <Text style={styles.reasonTitle}>6. User-Friendly Interface:</Text>
        <Text style={styles.reasonText}>
          No need for extensive training. STAP™ boasts a user-friendly interface
          that allows you to get started quickly. Focus on growing your
          business, not learning complicated software.
        </Text>

        <Text style={styles.reasonTitle}>
          7. Future-Proofing Your Business:
        </Text>
        <Text style={styles.reasonText}>
          STAP™ is committed to continuous improvement. We're always working on
          adding new features and functionalities to stay ahead of the curve. By
          choosing STAP™, you're investing in a tool that evolves with your
          business needs.
        </Text>
        <Text style={styles.contact}>Contact Information:</Text>
        <Pressable onPress={() => openLink("mailto:info@codexpandit.com")}>
          <Text style={styles.link}>info@codexpandit.com (Company Email)</Text>
        </Pressable>
        <Pressable onPress={() => openLink("https://www.codexpandit.com")}>
          <Text style={styles.link}>www.codexpandit.com (Company Website)</Text>
        </Pressable>
        <Pressable onPress={() => openLink("https://wa.me/+971561452526")}>
          <Text style={styles.link}>+971561452526 (Company WhatsApp)</Text>
        </Pressable>
        <Pressable onPress={() => openLink("mailto:info@stap-crm.com")}>
          <Text style={styles.link}>
            info@stap-crm.com (STAP Customer Service Email)
          </Text>
        </Pressable>
        <Pressable
          onPress={() => props.navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
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
    backgroundColor: "#fff",
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
    fontStyle: "italic",
    marginBottom: 20,
    fontFamily: "headers",
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "headers",
  },
  reasonsContainer: {
    width: "100%",
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
    fontFamily: "headers",
  },
  reasonText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "headers",
  },
  backButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    width: isWeb() ? globalWidth("15%") : globalWidth("40%"),
    marginVertical: 20,
    alignSelf: "center",
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
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
    fontFamily: "headers",
    cursor: "pointer",
    textAlign: "center",
  },
});

export const whySTAPPageOptions = (navData) => {
  return {
    headerTitle: "Why STAP™",
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

export default WhySTAPPage;
