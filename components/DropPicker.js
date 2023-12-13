import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const DropPicker = (props) => {
  const { list, placeholder, valueSelected, showingValue, isOpened } = props;

  const [open, setOpen] = useState(false);
  const [itemValue, setItemValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (itemValue) {
      setSelectedValue(itemValue);
      valueSelected(itemValue);
    }
  }, [itemValue]);

  useEffect(() => {
    isOpened(open);
  }, [open]);

  return (
    <View style={styles.container}>
      <View style={[props.dropContainerStyle, styles.dropContainerStyle]}>
        <DropDownPicker
          open={open}
          value={showingValue}
          items={list}
          setOpen={setOpen}
          setValue={setItemValue}
          setItems={setItemValue}
          placeholder={placeholder ? placeholder : "Select an item"}
          placeholderStyle={{ color: "#6a6b6c" }}
          style={styles.listStyle}
          textStyle={styles.dropText}
          dropDownContainerStyle={styles.dropListStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: globalHeight("1%"),
    zIndex: 100,
  },
  dropContainerStyle: {
    width: globalWidth("75%"),
    alignSelf: "center",
  },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: Platform.OS === "web" ? "80%" : "95%",
    alignSelf: "center",
    borderWidth: 0,
    height: globalWidth("3.5%"),
    zIndex: 100,
    borderWidth: 1.5,
    borderColor: "#6a6b6c",
    marginBottom: 40,
  },
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: Platform.OS === "web" ? globalWidth("1.1%") : globalWidth("3.5%"),
  },
  dropListStyle: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: Colors.primary,
    width: Platform.OS === "web" ? "80%" : "95%",
    alignSelf: "center",
    zIndex: 1000,
    elevation: 10,
  },
});

export const DropPickerOptions = (navData) => {
  return {
    headerTitle: "DropPicker",
  };
};

export default DropPicker;
