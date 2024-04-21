import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const PartnerShip = (props) => {
  const {
    getInvestAmount,
    getPercentage,
    getDateOfStart,
    getResponsiblitites,
  } = props;

  const [investementAmount, setInvestementAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [dateOfStart, setDateOfStart] = useState("");
  const [responsibilities, setResponsibilities] = useState([""]);

  const changePercentage = (text) => {
    const percent = text / 100;
    setPercentage(percent);
  };

  const addResponsibilities = () => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities.push("");
    setResponsibilities(newResponsibilities);
  };

  const removeResponsibilities = (index) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities.splice(index, 1);
    setResponsibilities(newResponsibilities);
  };

  useEffect(() => {
    if (investementAmount) {
      getInvestAmount(+investementAmount);
    }
  }, [investementAmount]);

  useEffect(() => {
    if (percentage) {
      getPercentage(percentage);
    }
  }, [percentage]);

  useEffect(() => {
    if (dateOfStart) {
      getDateOfStart(dateOfStart);
    }
  }, [dateOfStart]);

  useEffect(() => {
    if (responsibilities) {
      getResponsiblitites(responsibilities);
    }
  }, [responsibilities]);

  return (
    <View style={styles.container}>
      <Input
        label="Investment Amount"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        onChangeText={(text) => setInvestementAmount(text)}
        rightIcon={
          <FontAwesome5
            name="money-bill-wave"
            size={globalWidth("1.5%")}
            color={Colors.font}
            style={styles.icon}
          />
        }
        rightIconContainerStyle={styles.icon}
      />
      <Input
        label="Percentage"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        onChangeText={(text) => changePercentage(text)}
        rightIcon={
          <FontAwesome5
            name="percentage"
            size={globalWidth("1.5%")}
            color={Colors.font}
            style={styles.icon}
          />
        }
        rightIconContainerStyle={styles.icon}
      />
      <Input
        label="Date of Start"
        placeholder="DD/MM/YYYY"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        labelStyle={styles.label}
        onChangeText={(text) => setDateOfStart(text)}
        rightIcon={
          <FontAwesome5
            name="calendar-alt"
            size={globalWidth("1.5%")}
            color={Colors.font}
            style={styles.icon}
          />
        }
        rightIconContainerStyle={styles.icon}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Responsibility"
          type="clear"
          titleStyle={styles.label}
          onPress={addResponsibilities}
        />
      </View>
      {responsibilities.map((responsibility, index) => {
        return (
          <View style={styles.inputRow}>
            <Input
              key={index}
              defaultValue={responsibility}
              label={`Responsibility ${index + 1}`}
              containerStyle={[styles.inputContainer, { width: "80%" }]}
              inputStyle={styles.input}
              labelStyle={styles.label}
              onChangeText={(text) => {
                const newResponsibilities = [...responsibilities];
                newResponsibilities[index] = text;
                setResponsibilities(newResponsibilities);
              }}
              rightIcon={
                <FontAwesome5
                  name="hockey-puck"
                  size={globalWidth("1.5%")}
                  color={Colors.font}
                  style={styles.icon}
                />
              }
              rightIconContainerStyle={styles.icon}
            />
            <TouchableOpacity onPress={() => removeResponsibilities(index)}>
              <FontAwesome
                name="remove"
                size={globalWidth("1.5%")}
                color="#ff0055"
              />
            </TouchableOpacity>
          </View>
        );
      })}
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
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    alignSelf: "center",
  },
});

export default PartnerShip;
