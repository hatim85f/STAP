import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionDetails from "../subscription/SubscriptionDetails";

const UserPackage = (props) => {
  return (
    <View style={styles.container}>
      <SubscriptionDetails
        profile={props.profile}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default UserPackage;
