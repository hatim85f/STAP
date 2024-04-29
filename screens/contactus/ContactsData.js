import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  Fontisto,
  Entypo,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { globalWidth } from "../../constants/globalWidth";

const ContactsData = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Entypo
          name="location-pin"
          size={globalWidth("1.5%")}
          color={Colors.primary}
        />
        <Text style={styles.title}>Location</Text>
        <Text style={styles.description}>Sharjah - UAE</Text>
      </View>
      <View style={styles.iconContainer}>
        <Fontisto
          name="phone"
          size={globalWidth("1.5%")}
          color={Colors.primary}
        />
        <Text style={styles.title}>Phone</Text>
        <Text style={styles.description}>+971 56 145 2526</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="web"
          size={globalWidth("1.5%")}
          color={Colors.primary}
        />
        <Text style={styles.title}>Website</Text>
        <Text style={styles.description}>www.stap-crm.com</Text>
      </View>
      <View style={styles.iconContainer}>
        <Fontisto
          name="email"
          size={globalWidth("1.5%")}
          color={Colors.primary}
        />
        <Text style={styles.title}>Email</Text>
        <Text style={styles.description}>info@stap-crm.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: globalWidth("45%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalWidth("5%"),
  },
  iconContainer: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
    width: globalWidth("10%"),
    height: globalWidth("6%"),
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: globalWidth("1.2%"),
    fontFamily: "numbers",
  },
  description: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "numbers",
  },
});

export const ContactsDataOptions = (navData) => {
  return {
    headerTitle: "ContactsData",
  };
};

export default ContactsData;
