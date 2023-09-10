import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as settingsActions from "../../store/settings/settingsActions";
import { globalHeight } from "../../constants/globalWidth";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const ChangeBusinessCurrency = (props) => {
  const { currencyList } = useSelector((state) => state.settings);

  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currencyData, setCurrencyData] = useState([]);

  const handlePress = () => {
    // Toggle the editing state when pressed
    setIsEditing((prevEditing) => !prevEditing);
  };

  const dispatch = useDispatch();

  // getting currency data
  useEffect(() => {
    dispatch(settingsActions.getCurrencyList());
  }, [dispatch]);

  useEffect(() => {
    const updatedList = [...new Set(currencyList)];
    const currencyData = updatedList.map((currency, index) => {
      return {
        key: index,
        label: `${currency.countryName} - ${currency.currencyName}`,
        value: {
          key: index,
          currencyCode: currency.currencyCode,
          currencySymbol: currency.currencySymbol,
          countryFlag: currency.countryFlag,
          currencyName: currency.currencyName,
        },
        icon: () => (
          <Avatar
            source={{ uri: currency.countryFlag }}
            rounded
            size="small"
            containerStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          />
        ),
      };
    });

    setCurrencyData([...new Set(currencyData)]);
  }, [currencyList]);

  const submitValue = () => {
    props.editedValue(selectedCurrency);
    setIsEditing(false);
  };

  return (
    <View style={styles.descriptionContainer}>
      {!props.hideEditButton && (
        <TouchableOpacity
          onPress={handlePress}
          style={{ alignSelf: "flex-end" }}
        >
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
      )}
      {props.children}
      {props.changeCurrency && isEditing && (
        <View
          style={[styles.checkboxContainer, { zIndex: 100, elevation: 20 }]}
        >
          <DropDownPicker
            searchable={true}
            itemKey="key"
            items={currencyData}
            open={open}
            value={selectedCurrency}
            setOpen={setOpen}
            setValue={setSelectedCurrency}
            setItems={setCurrencyData}
            placeholder="Select Currency"
            placeholderStyle={{ color: "#6a6b6c" }}
            style={{ marginTop: 15 }}
            dropDownContainerStyle={{
              zIndex: 50,
              elevation: 20,
            }}
            dropDownDirection="TOP"
            textStyle={styles.dropText}
            listChildContainerStyle={{
              borderRadius: 25,
              borderColor: Colors.primary,
              height: open ? globalHeight("20%") : globalHeight("5%"),
              backgroundColor: "red",
            }}
          />
          <TouchableOpacity onPress={submitValue}>
            <Text style={[styles.submitText, { textAlign: "center" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionContainer: {
    padding: 15,
    borderBottomWidth: 1.5,
    borderColor: "#6a6b6c",
    zIndex: 500,
    overlayColor: "yellow",
  },
  input: {
    marginTop: 10,
    width: "100%",
    fontFamily: "headers",
    color: Colors.font,
  },
  header: {},
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: globalHeight("2%"),
  },
  submitText: {
    color: "blue",
    fontFamily: "headers",
    fontWeight: "bold",
    marginTop: 15,
  },
});

export const ChangeBusinessCurrencyOptions = (navData) => {
  return {
    headerTitle: "ChangeBusinessCurrency",
  };
};

export default ChangeBusinessCurrency;
