import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import * as authActions from "../../store/auth/authActions";

const CountryCodeSelect = (props) => {
  const { countriesCodes } = useSelector((state) => state.auth);
  const { getCountry, clearData } = props;

  const [open, setOpen] = useState(false);
  const [selectedValue, setselectedValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [codesOpen, setCodesOpen] = useState(false);

  useEffect(() => {
    getCountry(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (clearData) {
      setselectedValue("");
    }
  }, [clearData]);

  const dispatch = useDispatch();

  // getting countrirs codes
  useEffect(() => {
    if (countriesCodes.length === 0) {
      dispatch(authActions.getCountriesCodes());
    }
  }, [dispatch, countriesCodes]);

  // creating the country code array

  useEffect(() => {
    const codes = countriesCodes.map((a) => {
      return {
        label: a.name,
        value: a.code + a.suffixes,
        icon: () => (
          <Avatar
            source={{ uri: a.flag }}
            size={35}
            rounded
            containerStyle={{ height: 35, width: 35, position: "relative" }} // Adjust the container size
            avatarStyle={{ height: "100%", width: "150%" }} // Display the image in full
          />
        ),
      };
    });
    setCountryCode(codes);
  }, [countriesCodes]);

  return (
    <DropDownPicker
      open={codesOpen}
      value={selectedValue}
      items={[{ label: "Select Country", value: "" }, ...countryCode]}
      setOpen={setCodesOpen}
      setValue={setselectedValue}
      setItems={setCountryCode}
      placeholder="Select Country"
      placeholderStyle={{ color: "#6a6b6c" }}
      searchable={true} // Enable search functionality
      searchablePlaceholder="Search for a country..." // Placeholder for search input
      searchableStyle={{ color: "#6a6b6c" }} // Style for the search input
      style={[styles.listStyle, { width: "100%" }]}
      textStyle={[styles.dropText, { fontSize: globalHeight("2") }]}
      listChildContainerStyle={{
        borderRadius: 25,
        borderColor: Colors.primary,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
});

export const CountryCodeSelectOptions = (navData) => {
  return {
    headerTitle: "CountryCodeSelect",
  };
};

export default CountryCodeSelect;
