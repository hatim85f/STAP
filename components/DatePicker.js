import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

const CustomisedPicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <input type="number" onChange={(e) => console.log(e.target.value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 300,
  },
  header: {},
});

export const CustomisedPickerOptions = (navData) => {
  return {
    headerTitle: "CustomisedPicker",
  };
};

export default CustomisedPicker;
