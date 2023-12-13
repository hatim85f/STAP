import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Chart from "../charts/Chart";
import CustomChart from "../charts/Chart";
import { ScrollView } from "react-native";

const PhasingModal = (props) => {
  const { isVisible, phasing, onSelectedPhasing } = props;

  const [phasingDetails, setPhasingDetails] = useState([]);
  const [selectedPahsing, setSelectedPahsing] = useState("");

  const transformedData = phasing.map((entry) => {
    const phasingPercentage = entry.phasingPercentage[0];
    return Object.keys(phasingPercentage).map((month) => ({
      x: month,
      y: phasingPercentage[month] * 100,
      label: `${(phasingPercentage[month] * 100).toFixed(0)}%`,
    }));
  });

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.header}>
        <Icon
          name="close"
          type="material-community"
          color="red"
          size={30}
          selectionColor="green"
          containerStyle={{ alignSelf: "flex-end" }}
          onPress={() => {
            setSelectedPahsing("");
            props.closeModal();
          }}
        />
      </View>

      <ScrollView scrollEnabled scrollEventThrottle={16}>
        <View style={styles.container}>
          {phasing &&
            phasing.length > 0 &&
            phasing.map((item, index) => {
              return (
                <View key={index} style={styles.phasingContainer}>
                  <CustomChart
                    categories={transformedData[index].map((entry) => entry.x)}
                    series={[
                      {
                        name: transformedData[index].x,
                        data: transformedData[index].map(
                          (entry) => parseInt(entry.y).toFixed(2) + "%"
                        ),
                      },
                    ]}
                  />
                  <Text style={styles.titleText}>{item.phasingName}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPahsing(item._id);
                      onSelectedPhasing(item._id);
                    }}
                    style={
                      selectedPahsing === item._id
                        ? styles.selectedBtn
                        : styles.selectingButton
                    }
                  >
                    <Text
                      style={
                        selectedPahsing === item._id
                          ? styles.selectedText
                          : styles.selectingText
                      }
                    >
                      Select
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  selectingButton: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  selectedBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  titleText: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("1.25%"),
    color: Colors.font,
  },
  phasingContainer: {
    width: globalWidth("75%"),
    alignSelf: "center",
    marginBottom: globalHeight("5%"),
    borderWidth: 1.5,
    borderColor: Colors.font,
    borderRadius: 10,
    padding: 10,
  },
});

export const PhasingModalOptions = (navData) => {
  return {
    headerTitle: "PhasingModal",
  };
};

export default PhasingModal;
