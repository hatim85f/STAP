import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { Platform } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button, CheckBox, Input, Switch } from "react-native-elements";
import { useDispatch } from "react-redux";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

import * as teamActions from "../../store/team/teamActions";
import * as businessActions from "../../store/business/businessActions";
import { Alert } from "react-native";

const EditMember = (props) => {
  const { member, close } = props;

  const [designation, setDesignation] = useState(member.designation);
  const [userType, setUserType] = useState(member.userType);
  const [isAuthorized, setIsAuthorized] = useState(member.isAuthorized);

  const dispatch = useDispatch();

  const editMember = () => {
    dispatch(
      teamActions.editTeamMember(
        member._id,
        designation,
        userType,
        isAuthorized
      )
    );
    dispatch(businessActions.getUserBusiness());
    close();
  };

  const confirmDelete = () => {
    dispatch(teamActions.deleteTeamMember(member._id)),
      dispatch(businessActions.getUserBusiness());
    close();
  };

  const deleteMember = () => {
    if (Platform.OS === "web") {
      confirm(`Are you sure you want to delete ${member.firstName}?`)
        ? confirmDelete()
        : null;
    } else {
      Alert.alert(
        `Are you sure you want to delete ${member.firstName}?`,
        "",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => confirmDelete(),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: member.profilePicture }} style={styles.profile} />
      <Text style={styles.name}>{member.userName}</Text>
      <Input
        placeholder="Designation"
        value={designation}
        label="Designation"
        onChangeText={(text) => setDesignation(text)}
        style={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderTextColor="white"
      />
      <View style={styles.row}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            checked={userType === "Business Admin"}
            onPress={() => setUserType("Business Admin")}
            checkedColor="white"
            size={Platform.OS === "web" ? globalWidth("3%") : globalWidth("8%")}
          />
          <Text style={styles.checkText}>Business Admin</Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            checked={userType === "Employee"}
            onPress={() => setUserType("Employee")}
            checkedColor="white"
            size={Platform.OS === "web" ? globalWidth("3%") : globalWidth("8%")}
          />
          <Text style={styles.checkText}>Employee</Text>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.authText}>
          Authorize {member.firstName}
          {Platform.OS === "web" ? " to manage Sales and team" : ""}
        </Text>
        <Switch
          value={isAuthorized}
          onValueChange={() => setIsAuthorized(!isAuthorized)}
          color={Colors.primary}
          style={{ marginTop: 10 }}
        />
      </View>
      <Button
        title="Submit"
        onPress={editMember}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
      />
      <Button
        title={`Delete ${member.firstName}`}
        onPress={deleteMember}
        titleStyle={[styles.titleStyle, { color: "white" }]}
        buttonStyle={styles.deleteStyle}
        iconRight={true}
        icon={
          <FontAwesome
            name="trash"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        }
      />
      <Button
        title="Cancel"
        onPress={() => close()}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.cancelStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: globalWidth("5%"),
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontFamily: "headers",
    color: "white",
    fontSize: Platform.OS === "web" ? globalWidth("2%") : globalWidth("4%"),
    marginTop: 15,
  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    fontFamily: "headers",
    color: Colors.font,
    marginTop: 10,
    paddingLeft: 10,
  },
  labelStyle: {
    color: "white",
    marginTop: 25,
    fontSize: Platform.OS === "web" ? globalWidth("1.5%") : globalWidth("4%"),
    fontFamily: "headers",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  checkBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    color: "white",
    fontSize: Platform.OS === "web" ? globalWidth("1.5%") : globalWidth("4%"),
    fontFamily: "headers",
  },
  switchContainer: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 5,
    height: 60,
  },
  authText: {
    color: Colors.font,
    fontFamily: "headers",
  },
  buttonStyle: {
    backgroundColor: "white",
    borderColor: Colors.accent,
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("50%"),
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
  titleStyle: {
    color: Colors.font,
    fontFamily: "headers",
  },
  deleteStyle: {
    backgroundColor: "#ff0055",
    borderColor: "#ff0055",
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("50%"),
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
  cancelStyle: {
    backgroundColor: "skyblue",
    borderColor: "skyblue",
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("50%"),
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
});

export default EditMember;
