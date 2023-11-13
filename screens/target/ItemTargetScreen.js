import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import numberWithComa from "../../components/helpers/numberWithComa";
import MonthShape from "../../components/MonthShape";
import MenuButton from "../../components/webComponents/menu/MenuButton";

const ItemTargetScreen = (props) => {
  const { product, year } = props.route.params;

  const [targetUnits, setTargetUnits] = useState(null);
  const [targetValue, setTargetValue] = useState(null);

  useEffect(() => {
    const productTarget = product.target.yearTarget.map(
      (item) => item.targetUnits
    );
    const targetUnits = productTarget.reduce((a, b) => a + b, 0);
    setTargetUnits(targetUnits);

    const productValue = product.target.yearTarget.map(
      (item) => item.targetValue
    );
    const targetValue = productValue.reduce((a, b) => a + b, 0);
    setTargetValue(targetValue);
  }, [product]);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <View style={styles.imageContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            source={{ uri: product.imageURL }}
            size={globalWidth("6%")}
            avatarStyle={[styles.avatarStyle]}
            rounded
          />
        </View>
        <Text style={styles.name}>
          {" "}
          {product.productNickName} {"  "}target for {year}{" "}
        </Text>
        <Text style={styles.name}>
          Target :{" "}
          <Text style={styles.number}>
            {targetUnits ? numberWithComa(parseInt(targetUnits)) : 0}
          </Text>
        </Text>
        <Text style={styles.name}>
          Value :{" "}
          <Text style={styles.number}>
            {targetValue ? numberWithComa(parseInt(targetValue)) : 0}{" "}
          </Text>{" "}
          {product.currencyCode}
        </Text>
      </View>
      <View style={styles.targetDataContainer}>
        <Text style={styles.data}>
          Start Period :{" "}
          <Text style={styles.details}>{product.startMonth}</Text>/ {year}
        </Text>
        <Text style={styles.data}>
          End Period :{" "}
          <Text style={styles.details}>
            {product.endMonth ? product.endMonth : "Not Set"}
          </Text>
          / {year}
        </Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={product.target.yearTarget}
          numColumns={4}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <MonthShape
                month={item.month}
                targetUnits={numberWithComa(parseInt(item.targetUnits))}
                targetValue={numberWithComa(parseInt(item.targetValue))}
                currencyCode={product.currencyCode}
                productPrice={numberWithComa(parseInt(product.retailPrice))}
                phasing={parseFloat(item.targetPhases).toFixed(0) + "%"}
              />
            );
          }}
        />
        <View style={{ height: globalHeight("25%"), backgroundColor: "red" }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "scroll",
  },
  buttonContainer: {
    width: "95%",
    paddingLeft: "5%",
    marginTop: 10,
    cursor: "pointer",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -globalHeight("3%"),
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    elevation: 10,
    borderRadius: "50%",
    borderColor: Colors.primary,
    borderWidth: 2.5,
  },

  avatar: {
    borderWidth: 2.5,
    borderColor: "#6a6b6c",
  },
  name: {
    marginTop: 10,
    color: Colors.font,
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
  },
  number: {
    color: Colors.primary,
    fontFamily: "numbers",
  },
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: globalHeight("25%"),
    marginTop: 10,
  },
  targetDataContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});

export const ItemTargetScreenOptions = (navData) => {
  return {
    headerTitle: "ItemTargetScreen",
  };
};

export default ItemTargetScreen;
