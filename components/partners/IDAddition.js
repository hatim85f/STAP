import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { globalWidth } from "../../constants/globalWidth";
import UploadImage from "../helpers/UploadImages";
import DropDownPicker from "react-native-dropdown-picker";

import { Octicons, MaterialIcons } from "@expo/vector-icons";

const IDAddition = (props) => {
  const {
    getIDImage,
    getIDType,
    getIDNumber,
    getIDExpire,
    businessName,
    businessId,
    firstName,
    lastName,
  } = props;

  const [idImage, setIdImage] = useState("");
  const [idType, setIdType] = useState("");
  const [idList, setidList] = useState([
    {
      label: "Passport",
      value: "Passport",
    },
    {
      label: "National ID",
      value: "National ID",
    },
  ]);
  const [idNumber, setIdNumber] = useState(null);
  const [idExpire, setIdExpire] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (idImage) {
      getIDImage(idImage);
    }
  }, [idImage]);

  useEffect(() => {
    if (idType) {
      getIDType(idType);
    }
  }, [idType]);

  useEffect(() => {
    if (idNumber) {
      getIDNumber(idNumber);
    }
  }, [idNumber]);

  useEffect(() => {
    if (idExpire) {
      getIDExpire(idExpire);
    }
  }, [idExpire]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, { marginBottom: globalWidth("2%") }]}
      >
        <DropDownPicker
          open={open}
          value={idType}
          items={idList}
          setOpen={setOpen}
          setValue={setIdType}
          setItems={setidList}
          placeholder="Select ID Type"
        />
      </View>
      {!open && (
        <>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { fontWeight: "bold" }]}>ID Image</Text>
            <UploadImage
              imageName={`${businessName}/${firstName}_${lastName}`}
              getURL={(data) => setIdImage(data)}
              subFolder={`partner_id_image`}
            />
          </View>

          <Input
            label="ID Number"
            placeholder="Enter ID Number"
            onChangeText={(text) => setIdNumber(text)}
            keyboardType="number-pad"
            labelStyle={styles.label}
            containerStyle={[
              styles.inputContainer,
              { marginTop: globalWidth("2%") },
            ]}
            inputStyle={styles.input}
            rightIcon={
              <Octicons
                name="number"
                size={globalWidth("2%")}
                color={Colors.font}
              />
            }
            rightIconContainerStyle={styles.icon}
          />
          <Input
            label="ID Expiry Date"
            placeholder="DD/MM/YYYY"
            onChangeText={(text) => setIdExpire(text)}
            labelStyle={styles.label}
            containerStyle={[
              styles.inputContainer,
              { marginTop: globalWidth("2%") },
            ]}
            inputStyle={styles.input}
            rightIcon={
              <MaterialIcons
                name="date-range"
                size={globalWidth("2%")}
                color={Colors.font}
              />
            }
            rightIconContainerStyle={styles.icon}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    alignSelf: "center",
    width: "40%",
    alignSelf: "center",
  },
  input: {
    fontFamily: "HelveticaNeue",
    color: Colors.font,
    fontSize: globalWidth("1.2%"),
  },
  icon: {
    marginRight: globalWidth("2%"),
  },
  label: {
    fontFamily: "Poppins_400Regular",
    color: Colors.font,
    fontSize: globalWidth("1%"),
  },
  error: {
    fontFamily: "Poppins_400Regular",
    color: "red",
    fontSize: globalWidth("1%"),
    textAlign: "center",
  },
});

export default IDAddition;
