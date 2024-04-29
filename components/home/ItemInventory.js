import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const ItemInventory = (props) => {
  const { performanceData } = props;

  const [maxScrollNumber, setMaxScrollNumber] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(globalWidth("2%"));

  useEffect(() => {
    if (performanceData && performanceData.length > 0) {
      setMaxScrollNumber(performanceData.length - 2);
    }
  }, [performanceData]);

  const scrollViewRef = useRef(null);

  const scrollLeft = () => {
    setMaxScrollNumber(performanceData?.length - 1);
    setScrollWidth(globalWidth("2%"));

    scrollViewRef.current?.scrollTo({
      x: (scrollViewRef.current?.scrollX || 0) - scrollWidth,
      animated: true,
    });
  };

  const scrollRight = () => {
    let newMaxScrollNumber = maxScrollNumber;

    if (newMaxScrollNumber === 0) {
      return;
    }

    setMaxScrollNumber(newMaxScrollNumber - 1);

    const newScrollWidth = scrollWidth;
    const appliedWidth = newScrollWidth + globalWidth("15%");
    setScrollWidth(appliedWidth);

    scrollViewRef.current?.scrollTo({
      x: (scrollViewRef.current?.scrollX || 0) + appliedWidth,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Items Inventory</Text>
      <View style={styles.mainRow}>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowContainer}>
          <AntDesign
            name="caretleft"
            size={globalWidth("2%")}
            color="#008FFB"
          />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          scrollEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: globalWidth("55%") }}
          ref={scrollViewRef}
        >
          {performanceData &&
            performanceData.map((item, index) => {
              return (
                <View style={styles.itemContainer} key={index}>
                  <Text style={styles.itemName}> {item.productName} </Text>
                  <Image source={{ uri: item.imageURL }} style={styles.image} />
                  <Text style={styles.itemName}>
                    {" "}
                    Availble Quantity: {item.inventory}{" "}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
        <TouchableOpacity
          onPress={scrollRight}
          style={styles.arrowContainer}
          disabled={maxScrollNumber > 0 && maxScrollNumber < 1}
        >
          <AntDesign
            name="caretright"
            size={globalWidth("2%")}
            color="#008FFB"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    padding: globalWidth("1%"),
    height: globalHeight("30%"),
    backgroundColor: "#FFFFF3",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomRightRadius: 10,
    paddingBottom: 0,
  },
  header: {
    fontSize: globalWidth("1.8% "),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-aroundehigh",
    alignItems: "center",
    marginTop: globalHeight("1%"),
  },
  arrowContainer: {
    width: globalWidth("2.5%"),
    height: globalWidth("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: globalWidth("10%"),
    maxHeight: globalHeight("22%"),
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: globalWidth("1%"),
    borderRadius: 3,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: globalWidth("1%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  itemName: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
    marginBottom: globalHeight("0.5%"),
    fontStyle: "italic",
    textAlign: "center",
  },
  image: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderRadius: globalWidth("2.5%"),
    borderWidth: 1,
    borderCoolor: Colors.primary,
    marginVertical: globalHeight("1%"),
  },
});

export default ItemInventory;
