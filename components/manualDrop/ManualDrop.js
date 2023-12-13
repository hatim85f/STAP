import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import AnimatedChevron from "../AnimatedChevron";
import { Pressable } from "react-native";

const ManualDrop = (props) => {
  const {
    list,
    placeholder,
    getSelectedValue,
    currentIndex,
    hideChevron,
    top,
  } = props;

  const [listIsOpen, setListIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const changeSelectedValue = (item) => {
    setSelectedValue(item.value);
    getSelectedValue(item.value);
    setSelectedLabel(item.label);
    setListIsOpen(false);
  };

  useEffect(() => {
    setListIsOpen(false);
  }, [currentIndex]);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          marginTop: top,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            zIndex: listIsOpen ? 1000 : 0,
            elevation: listIsOpen ? 10 : 0,
            position: listIsOpen ? "relative" : "absolute",
          },
        ]}
      >
        <Pressable
          style={styles.row}
          onPress={() => setListIsOpen(!listIsOpen)}
        >
          <Text style={styles.label}>
            {selectedLabel ? selectedLabel : placeholder}
          </Text>
          {!hideChevron && <AnimatedChevron isOpen={listIsOpen} />}
        </Pressable>
        {list &&
          listIsOpen &&
          list.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => changeSelectedValue(item)}
                style={[
                  styles.pressContainer,
                  {
                    backgroundColor:
                      item.value === selectedValue ? Colors.primary : "white",
                  },
                ]}
                key={index}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color:
                        item.value === selectedValue ? "white" : Colors.font,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: Colors.primary,
    borderWidth: 1,
    top: 0,
    maxHeight: globalWidth("30%"),
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    position: "relative",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  label: {
    fontFamily: "headers",
    fontSize: globalWidth("0.7%"),
    color: Colors.font,
    textAlign: "center",
  },
  pressContainer: {
    width: "100%",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderBlockColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  header: {},
});

export const ManualDropOptions = (navData) => {
  return {
    headerTitle: "ManualDrop",
  };
};

export default ManualDrop;
