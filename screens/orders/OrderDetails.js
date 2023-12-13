import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native";

const OrderDetails = (props) => {
  const { orderList, addDetails, deleteItem } = props;
  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {orderList &&
          orderList.length > 0 &&
          orderList.map((order, index) => {
            return (
              <View key={index} style={styles.lowerRow}>
                <View style={styles.smallRow}>
                  <Text style={styles.number}> {index + 1}) </Text>
                  <Text style={styles.number}>{order.productName}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteItem(index)}
                  style={{ cursor: "pointer" }}
                >
                  <MaterialCommunityIcons
                    name="cancel"
                    size={globalWidth("3%")}
                    color="#ff0055"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        {orderList.length > 0 && (
          <View
            style={{
              marginBottom: globalHeight("2%"),
            }}
          >
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.title}
              title="Add Details"
              onPress={addDetails}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: globalHeight("70%"),
    minHeight: globalHeight("70%"),
    width: globalWidth("45%"),
    alignSelf: "center",
  },
  header: {},
  lowerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  smallRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    color: Colors.primary,
  },
  button: {
    width: globalWidth("25%"),
    alignSelf: "center",
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
  },
});

export default OrderDetails;
