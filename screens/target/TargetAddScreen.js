import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

const TargetAddScreen = (props) => {
  const { productId, businessId } = props.route.params;
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <Text style={styles.header}>
        {JSON.stringify(productId)} {JSON.stringify(businessId)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const TargetAddScreenOptions = (navData) => {
  return {
    headerTitle: "TargetAddScreen",
  };
};

export default TargetAddScreen;
