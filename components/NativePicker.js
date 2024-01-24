import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import { Picker } from "@react-native-picker/picker";

const NativePicker = (props) => {
  const { list, getSelectedItem, placeholder } = props;

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getSelectedItem(selectedItem);
  }, [selectedItem]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedItem}
        style={styles.listContainer}
        selectionColor={Colors.primary}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
      >
        <Picker.Item label={placeholder} value="" />
        {list.map((item) => {
          return (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    height: globalHeight("6%"),
    width: globalWidth("12%"),
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
    color: Colors.font,
    marginLeft: globalWidth("1%"),
  },
});

export const NativePickerOptions = (navData) => {
  return {
    headerTitle: "NativePicker",
  };
};

export default NativePicker;
