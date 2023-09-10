import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Avatar, CheckBox, Input } from "react-native-elements";
import Colors from "../../constants/Colors";
import UploadImages from "../helpers/UploadImages";

const BusinessItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");

  const handlePress = () => {
    // Toggle the editing state when pressed
    setIsEditing((prevEditing) => !prevEditing);
  };

  const submitEditedValue = () => {
    props.editedValue(editedValue);
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
      {!props.imageUpload && !props.check && isEditing && (
        <Input
          onChangeText={(text) => setEditedValue(text)}
          label={props.label}
          placeholder={props.placeholder}
          style={styles.input}
          labelStyle={styles.label}
          rightIcon={() => {
            return (
              <TouchableOpacity onPress={submitEditedValue}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {props.imageUpload && isEditing && (
        <>
          <UploadImages
            imageName={props.businessName}
            getURL={(data) => setEditedValue(data)}
            subFolder="businesses_logo/"
          />
          <TouchableOpacity onPress={submitEditedValue}>
            <Text style={[styles.submitText, { textAlign: "center" }]}>
              Submit
            </Text>
          </TouchableOpacity>
        </>
      )}
      {props.check && isEditing && (
        <View style={styles.checkContainer}>
          <View style={styles.innerCheck}>
            <CheckBox
              checked={editedValue === "Goods"}
              onPress={() => setEditedValue("Goods")}
              checkedColor={Colors.primary}
            />
            <Text style={styles.checkTitle}>Goods</Text>
          </View>
          <View style={styles.innerCheck}>
            <CheckBox
              checked={editedValue === "Services"}
              onPress={() => setEditedValue("Services")}
              checkedColor={Colors.primary}
            />
            <Text style={styles.checkTitle}>Services</Text>
          </View>
          <TouchableOpacity onPress={submitEditedValue}>
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
  descriptionContainer: {
    padding: 15,
    borderBottomWidth: 1.5,
    borderColor: "#6a6b6c",
    overflow: "hidden",
    zIndex: -100,
  },
  input: {
    marginTop: 10,
    width: "100%",
    fontFamily: "headers",
    color: Colors.font,
  },
  submitText: {
    color: "blue",
    fontFamily: "headers",
    fontWeight: "bold",
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  innerCheck: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkTitle: {
    fontFamily: "headers",
    color: Colors.font,
  },
});

export const BusinessItemOptions = (navData) => {
  return {
    headerTitle: "BusinessItem",
  };
};

export default BusinessItem;
