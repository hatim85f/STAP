import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { fontSize } from "../../constants/sizes";

const ChangeContactPerson = (props) => {
  const { team } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState({
    userName: "",
    email: "",
    contactNumber: "",
  });
  const [teamDetails, setTeamDetails] = useState([]);

  const handlePress = () => {
    // Toggle the editing state when pressed
    setIsEditing((prevEditing) => !prevEditing);
  };

  const submitEditedValue = () => {
    props.editedValue(editedValue);
    setIsEditing(false);
  };

  useEffect(() => {
    if (team && team.length > 0) {
      const teamData = team.map((a) => {
        return {
          userName: a.userName,
          email: a.email,
          contactNumber: a.phone,
          selected: false,
        };
      });

      setTeamDetails(teamData);
    }
  }, [team]);

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
      {isEditing && (
        <View>
          {teamDetails &&
            teamDetails.length > 0 &&
            teamDetails.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setEditedValue({
                      userName: item.userName,
                      email: item.email,
                      contactNumber: item.contactNumber,
                    })
                  }
                >
                  <Text
                    style={
                      editedValue.userName === item.userName
                        ? styles.selected
                        : styles.name
                    }
                  >
                    {item.userName}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  submitText: {
    color: "blue",
    fontFamily: "headers",
    fontWeight: "bold",
    marginTop: 15,
  },
  name: {
    fontFamily: "headers",
    fontSize: fontSize(),
    marginTop: 15,
  },
  selected: {
    fontFamily: "headers",
    fontSize: fontSize(),
    color: "blue",
    marginTop: 15,
    textAlign: "center",
  },
});

export default ChangeContactPerson;
